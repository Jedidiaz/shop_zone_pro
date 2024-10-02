import { Request, Response } from "express";
import { IUserSignIn, IUserSignUp } from "../interfaces/user.interface";
import { RecoverPasswordCodeModel, UserModel } from "../models";
import bcrypt from "bcrypt";

import { ValidatorsHelpers } from "../helpers";
import db from "../db/connection";
import { createToken } from "../utils/JWTManager";
import { generateVerificationCode } from "../utils/StringManager";
import Email from "../utils/Email";
import Config from "../Config";
import middlewares from "../middlewares";

const { existUser } = ValidatorsHelpers;
const { validateToken } = middlewares;

const signUp = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  try {
    const { email, name, password }: IUserSignUp = req.body;
    const validateUser = await existUser(email);

    if (validateUser.status)
      return res
        .status(validateUser.code)
        .json({ status: false, msg: validateUser.msg });

    const newPassword = await bcrypt.hash(password, 10);
    const data = {
      name,
      email,
      password: newPassword,
    };

    const user = await UserModel.create(data, { transaction }).then((data) =>
      data.toJSON()
    );

    delete user.password;
    await transaction.commit();
    res.status(201).json({
      status: true,
      msg: "¡Registro exitoso!, puede iniciar sesión.",
      user,
    });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: Users - 001",
    });
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUserSignIn = req.body;
    const user: any = await UserModel.findOne({
      where: { email, status: true },
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        msg: "El usuario no se encuentra registrado o está desactivado",
      });
    }

    const { password: pass, id } = user;

    const validatePassword = await bcrypt.compare(password, pass);
    if (!validatePassword) {
      return res
        .status(400)
        .json({ status: false, msg: "Contraseña invalida." });
    }

    const token = await createToken({ id: id });
    const userJson = user.toJSON();
    delete userJson.password;
    delete userJson.id;

    res.status(200).json({
      status: true,
      msg: "¡Inicio de sesión exitoso!",
      data: {
        user: userJson,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: Users - 002",
    });
  }
};

const recoverPassword = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  try {
    const { email } = req.body;
    const user: any = await UserModel.findOne({
      where: { email, status: true },
    }).then((data) => data?.toJSON());

    if (!user)
      return res.status(404).json({
        status: false,
        msg: "No existe el usuario o está desactivado.",
      });

    const codes: any[] = await RecoverPasswordCodeModel.findAll({
      where: { user_id: user.id, status: true },
    });

    if (codes.length > 0) {
      await Promise.all(
        codes.map(async (code: any) => {
          code.status = false;
          await code.save({ transaction });
        })
      );
    }

    const code = generateVerificationCode(4);

    await RecoverPasswordCodeModel.create(
      { code, user_id: user.id },
      { transaction }
    );
    const token = await createToken({ id: user.id, code }, 1800);

    await Email.sendCustomEmail(
      "Recuperar Contraseña",
      [user.email],
      "recoverEmail.html",
      {
        recoverLink: `${Config.urlFront}/change-password/${token}`,
        user_name: user.name,
      }
    );

    await transaction.commit();

    res.status(200).json({
      status: true,
      msg: `Código de recuperación enviado a su correo electrónico ${user.email}`,
    });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: Users - 003",
    });
  }
};

const changePassword = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  try {
    const { token, password } = req.body;

    let validatedToken;
    try {
      validatedToken = (await validateToken(token)) as any;
    } catch (error) {
      return res.status(401).json({
        status: false,
        msg: "Token inválido o expirado.",
      });
    }

    const { id, code } = validatedToken;
    const user: any = await UserModel.findOne({
      where: { id, status: true },
      attributes: ["id", "email", "password"],
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        msg: "Token inválido o expirado.",
      });
    }

    const passwordCode: any = await RecoverPasswordCodeModel.findOne({
      where: { user_id: user.id, status: true, code },
    });

    if (!passwordCode)
      return res.status(401).json({
        status: false,
        msg: "Token inválido o expirado.",
      });

    const newPasswordHashed = await bcrypt.hash(password, 10);

    await UserModel.update(
      { password: newPasswordHashed },
      { where: { id: user.id }, transaction }
    );

    passwordCode.status = false;
    await passwordCode.save();
    await transaction.commit();

    res.status(200).json({
      status: true,
      msg: "¡Se ha cambiado la contraseña correctamente!",
    });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: Users - 004",
    });
  }
};

export default { signUp, signIn, recoverPassword, changePassword };

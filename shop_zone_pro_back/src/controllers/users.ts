import { Request, Response } from "express";
import { IUserSignIn, IUserSignUp } from "../interfaces/user.interface";
import { UserModel } from "../models";
import bcrypt from "bcrypt";

import { ValidatorsHelpers } from "../helpers";
import db from "../db/connetcion";
import { createToken } from "../utils/JWTManager";

const { existUser } = ValidatorsHelpers;

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

    const { password: pass, id } = user.toJSON();

    const validatePassword = await bcrypt.compare(password, pass);
    if (!validatePassword) {
      return res
        .status(400)
        .json({ status: false, msg: "Contraseña invalida." });
    }

    const token = await createToken({ id: id });

    delete user.password;
    delete user.id;

    res.status(200).json({
      status: true,
      msg: "¡Inicio de sesión exitoso!",
      data: {
        user,
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

export default { signUp, signIn };

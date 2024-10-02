import { Request, Response } from "express";
import { IUserSignUp } from "../interfaces/user.interface";
import { UserModel } from "../models";
import bcrypt from "bcrypt";

import { ValidatorsHelpers } from "../helpers";
import db from "../db/connetcion";

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
    res
      .status(201)
      .json({ status: true, msg: "¡Registro exitoso!, puede iniciar sesión.", user });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: User - 003",
    });
  }
};


export default { signUp };

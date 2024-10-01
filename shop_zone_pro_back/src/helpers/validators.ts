import { UserModel } from "../models";

const existUserByID = async (id: number | string) => {
  if (id) {
    const user = await UserModel.findOne({ where: { id, status: true } });
    if (!user) {
      throw new Error("Usuario no se encuentra registrado o activo.");
    }
  }
};

const existUserByEmail = async (email: string) => {
  if (email) {
    const user = await UserModel.findOne({ where: { email, status: true } });
    if (!user) {
      throw new Error("Usuario no se encuentra registrado o activo.");
    }
  }
};

export default { existUserByEmail, existUserByID };

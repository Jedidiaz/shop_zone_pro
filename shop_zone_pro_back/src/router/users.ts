import { Router } from "express";
import { UserController } from "../controllers";
import { check } from "express-validator";
import { ValidatorsHelpers } from "../helpers";
import middlewars from "../middlewares";

const router = Router();
const { signUp, signIn, recoverPassword, changePassword } = UserController;
// const { existUserByEmail } = ValidatorsHelpers;
const { validatePasswordFormat, validateFields } = middlewars;
const { existUserByEmail } = ValidatorsHelpers;

//SignUp
router.post(
  "/signup",
  [
    check("email", "El email es obligatorio").notEmpty(),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("email", "El email debe ser un email valido").isEmail(),
    check("password", "La contraseña es obligatorio").notEmpty(),
    check("password").custom(validatePasswordFormat),
    validateFields,
  ],
  signUp
);

//SignIn
router.post(
  "/signin",
  [
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "El email debe ser un email valido").isEmail(),
    check("email").custom(existUserByEmail),
    check("password", "La contraseña es obligatorio").notEmpty(),
    validateFields,
  ],
  signIn
);

//Recover password
router.post(
  "/recover-password",
  [
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "El email debe ser un email valido").isEmail(),
    check("email").custom(existUserByEmail),
    validateFields,
  ],
  recoverPassword
);

//Update password
router.put(
  "/change-password",
  [
    check("password", "El email es obligatorio").notEmpty(),
    check("password").custom(validatePasswordFormat),
    check("token", "El token es necesario.").notEmpty(),
    validateFields,
  ],
  changePassword
);

module.exports = router;

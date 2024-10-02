import { Router } from "express";
import { UserController } from "../controllers";
import { check } from "express-validator";
import {ValidatorsHelpers} from "../helpers";
import middlewars from "../middlewares";

const router = Router();
const { signUp } = UserController;
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
  signUp
);

module.exports = router;

import { Router } from "express";
import { UserController } from "../controllers";
import { check } from "express-validator";
// import { ValidatorsHelpers } from "../Helpers";
import middlewars from "../middlewares";

const router = Router();
const { signUp } = UserController;
// const { existUserByEmail } = ValidatorsHelpers;
const { validateFields } = middlewars;

//SignUp
router.post(
  "/signup",
  [
    check("email", "El email es obligatorio").isEmpty(),
    check("name", "El nombre es obligatorio").isEmpty(),
    check("email", "El email debe ser un email valido").isEmail(),
    check("password", "La contraseña es obligatorio").isEmpty(),
    validateFields,
  ],
  signUp
);

export default router;

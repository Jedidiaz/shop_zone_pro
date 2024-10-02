import { Router } from "express";
import middlewares from "../middlewares";
import { categoryController } from "../controllers";
import { check } from "express-validator";

const { validateJWT, validateAdmin, validateFields } = middlewares;
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = categoryController;
const router = Router();
// get all categories
router.get("/", [validateJWT, validateAdmin, validateFields], getAllCategories);
// get category by id
router.get(
  "/:id",
  [
    validateJWT,
    validateAdmin,
    check("id", "El id es obligatorio").notEmpty(),
    validateFields,
  ],
  getCategoryById
);

//Create category
router.post(
  "/create",
  [
    validateJWT,
    validateAdmin,
    check("name", "El nombre es obligatorio").notEmpty(),
    validateFields,
  ],
  createCategory
);

//Create category
router.put(
  "/:id",
  [
    validateJWT,
    validateAdmin,
    check("name", "El nombre es obligatorio").notEmpty(),
    check("id", "El id es obligatorio").notEmpty(),
    validateFields,
  ],
  updateCategory
);

//delete category
router.delete(
  "/:id",
  [
    validateJWT,
    validateAdmin,
    check("id", "El id es obligatorio").notEmpty(),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;

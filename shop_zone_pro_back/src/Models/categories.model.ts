import { DataTypes } from "sequelize";
import db from "../db/connection";
import ProductCategory from "./product_category.model";

const Categories = db.define(
  "categories",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { updatedAt: false }
);

Categories.hasMany(ProductCategory, {
  as: "categories_products",
  foreignKey: "category_id",
});

export default Categories;

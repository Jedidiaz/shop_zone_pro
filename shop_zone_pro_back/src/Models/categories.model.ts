import { DataTypes } from "sequelize";
import db from "../db/connetcion";
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

Categories.belongsTo(ProductCategory, {foreignKey: "category_id", as: "categories_products"});

export default Categories;
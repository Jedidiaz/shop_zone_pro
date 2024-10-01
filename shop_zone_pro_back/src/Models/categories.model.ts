import { DataTypes } from "sequelize";
import db from "../db/connetcion";
import Products from "./product.model";

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

Categories.belongsToMany(Products, {
  through: "categories_products",
  as: "categories_products",
});

export default Categories;
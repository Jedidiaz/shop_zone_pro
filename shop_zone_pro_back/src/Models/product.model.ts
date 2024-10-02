import { DataTypes } from "sequelize";
import db from "../db/connection";
import ProductCategory from "./product_category.model";

const Products = db.define(
  "products",
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    images: {
      type: DataTypes.JSON, // Array<string>
      allowNull: false,
      defaultValue: [],
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { updatedAt: false }
);

Products.hasMany(ProductCategory, {
  as: "products_categories",
  foreignKey: "product_id",
});

export default Products;

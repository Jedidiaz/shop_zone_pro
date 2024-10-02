import fs from 'node:fs';
import Config from "../Config";
import jwt from "jsonwebtoken";

export const createToken = (
  data: { id: number},
  expiresIn?: string
) => {
  const privateKey = fs.readFileSync(Config.privateKey || "PRIVATE.pem");
  if (expiresIn) {
    return jwt.sign(data, privateKey, {
      expiresIn,
      algorithm: "ES512",
    });
  }
  return jwt.sign(data, privateKey, {
    algorithm: "ES512",
  });
};

import fs from "fs";
import Config from "../Config";
import { Request, Response } from "express";
import { VerifyErrors, verify } from "jsonwebtoken";
import { UserModel } from "../models";

const validateJWT = async (req: Request, res: Response, next: () => void) => {
  const token = req.headers["access-token"] || "";
  if (typeof token === "object") {
    return res.status(503).json({
      status: false,
      msg: "NOT-PROVIDED-TOKEN",
    });
  }

  if (token) {
    if (typeof req.ip === "object") {
      return res.status(503).json({
        status: false,
        msg: "NOT-PROVIDED-IP",
      });
    }
    try {
      req.body["decoded"] = await validateToken(token);
      next();
    } catch (error) {
      return res.status(503).json({ status: false, msg: "INVALID_TOKEN" });
    }
  } else {
    res.status(503).json({
      status: false,
      msg: "NOT-PROVIDED-TOKEN",
    });
  }
};

const validateToken = async (token: string) => {
  try {
    return new Promise((resolve, reject) => {
      const publicKey = fs.readFileSync(
        Config.publicKey,
        "utf8" || "PUBLIC.pem"
      );
      verify(
        token,
        publicKey,
        { algorithms: ["ES512"] },
        async (err: VerifyErrors | null, decoded) => {
          if (err) {
            return reject("INVALID_TOKEN");
          } else {
            return resolve(decoded);
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const validateAdmin = async (req: Request, res: Response, next: () => void) => {
  try {
    const { decoded } = req.body;
    const user: any = await UserModel.findByPk(decoded.id);
    if (user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ status: false, msg: "FORBIDDEN_ACCESS" });
    }
  } catch (error) {
    throw error;
  }
};

export default { validateJWT, validateToken, validateAdmin };

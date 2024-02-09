import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { oauthUser } from "./interface/oauth";

config();

const secret_key = process.env.SECRET_KEY!;

export interface JWTRequest extends Request {
  decoded?: unknown;
}

export const authJWT = (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.replace("Bearer ", "");

    req.decoded = jwt.verify(token, secret_key!);

    return next();
  } catch (error: any) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료 되었습니다.",
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        code: 401,
        message: "토큰이 유효하지 않습니다.",
      });
    }
  }
};

export const generateJwtToken = (user: oauthUser) => {
  return jwt.sign(
    {
      id: user.id,
      displayName: user.displayName,
      email: user.emails[0].value,
    },
    secret_key,
    { expiresIn: "30d" }
  );
};

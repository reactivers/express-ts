import { Request } from "express";
import jwt from "jsonwebtoken";
import { IJWTToken, NODE_ENV_ENUM } from "./types";

const getTokenExpireDuration = () => 24 * 60 * 60 * 1000;

export const isTest = () => getNodeEnv() === NODE_ENV_ENUM.TEST;
export const isProd = () => getNodeEnv() === NODE_ENV_ENUM.PRODUCTION;

export const getAppSecret = () => {
  if (!process.env.APP_SECRET) throw Error("APP_SECRET is not defined");
  return process.env.APP_SECRET;
};
export const getNodeEnv: () => NODE_ENV_ENUM = () => {
  if (!process.env.NODE_ENV) throw Error("NODE_ENV is not defined");
  return process.env.NODE_ENV as NODE_ENV_ENUM;
};

export const verifyJWT = (token: string): Promise<{ data: IJWTToken }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getAppSecret(), (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken as { data: IJWTToken });
    });
  });
};

export const createJWToken = (data: IJWTToken) => {
  const token = jwt.sign({ data }, getAppSecret(), {
    expiresIn: getTokenExpireDuration(),
    algorithm: "HS256",
  });
  return token;
};

export const getTokenFromRequest = (req: Request) => {
  const authorization = req.headers["authorization"] as string;
  if (!authorization) throw new Error("Invalid token");
  const token = authorization?.slice(7, authorization.length);
  if (!token) throw new Error("Invalid token");
  return token;
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

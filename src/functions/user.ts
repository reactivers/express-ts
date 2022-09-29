import type { Request } from "express";
import { getTokenFromRequest, verifyJWT } from "../utils/functions";
import { IUser } from "../utils/types";

export const findUserByToken: (token: string) => Promise<IUser> = async (token: string) => {
    if (!token) throw new Error("Invalid token");
    const decodedToken = await verifyJWT(token)
    const user = decodedToken.data.user
    return user;
}

export const getUserByRequest: (request: Request) => Promise<IUser> = async (request) => {
    const token = getTokenFromRequest(request);
    const user = await findUserByToken(token)
    return user;
}
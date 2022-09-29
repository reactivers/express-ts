import type { Express } from "express";
import authRoutes from "./auth";
import authorizationRoutes from "./authorization";
import jsonApiRoutes from "./json-api";

const initRoutes = async (app: Express) => {
    authRoutes.public(app);
    jsonApiRoutes.public(app);
    authorizationRoutes.public(app);
    authorizationRoutes.private(app);
    authRoutes.private(app);
    jsonApiRoutes.private(app);
};

export {
    initRoutes
};

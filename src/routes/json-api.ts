import * as JSONApi from "../methods/json-api";
import { IAppRoute } from "../utils/types";

const jsonApiRoutes: IAppRoute = {
    private(app) {
        app.get("/api/json-api/todo", JSONApi.getTodo);
    },
    public(app) {
        app.get("/api/json-api/post", JSONApi.getPost);
    },
}

export default jsonApiRoutes;
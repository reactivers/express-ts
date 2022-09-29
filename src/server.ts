import cors from "cors";
import express from "express";
import morgan from "morgan";
import { initRoutes } from "./routes";
import { isTest } from "./utils/functions";


const PORT = isTest() ? 8001 : 8000;
const app = express();

if (!isTest())
    app.use(morgan("tiny"));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initServer = async () => {
    await initRoutes(app)
    return app.listen(PORT)
}

export default initServer
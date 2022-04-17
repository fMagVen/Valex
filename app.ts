import cors from "cors";
import express from "express";
import router from "./routers/index.js";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandlingMiddleware);
export default app;
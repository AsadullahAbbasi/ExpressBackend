import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(
  express.urlencoded({ limit: "10kb", extended: true, parameterLimit: 50000 }),
);
app.use(cookieParser());


express.static("/public");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);


//routes import
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);


//routes declaration
export default app;



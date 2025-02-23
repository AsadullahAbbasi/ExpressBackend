import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({  limit : "10kb" }));

// app.use(
//   express.urlencoded({ limit: "10kb", extended: true, parameterLimit: 50000 }),
// );
app.use(cookieParser());


app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);


//routes import
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ message: "Something went wrong" });
// });

//routes declaration
export default app; 



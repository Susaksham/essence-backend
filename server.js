import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import conn from "./Db/conn.js";
import cors from "cors";
/**controllers */
import authRouter from "./Routes/authRoutes.js";
/** middleware */
import userRouter from "./Routes/userRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(
  cors({
    origin: `*`,
    credentials: true,
  })
);
app.disable("x-powered-by");
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  res.status(404).json({ error: "API Not Found!" });
});
conn()
  .then(() => {
    app.listen(port, () => {
      console.log("server is up and running");
    });
  })
  .catch((err) => {
    console.log(err);
  });

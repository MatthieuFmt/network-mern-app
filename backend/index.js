import mongoose from "mongoose";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { checkUser, requireAuth } from "./middleware/authMiddleware.js";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

dotenv.config();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// deployment

// routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use(express.static(path.join("./client/build")));
console.log(__dirname);
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client", "build", "index.html"));
});
app.use(
  "/uploads",
  express.static(path.join(__dirname, "client/build/uploads"))
);

// DB
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecté à la base de données");
  })
  .catch((err) => {
    console.log("Erreur lors de la connection à la base de données !");
    console.log(err);
  });

// server
app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port : ${PORT}`);
});

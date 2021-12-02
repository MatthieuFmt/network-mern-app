import express from "express";
import { catchErrors } from "../helpers.js";
import {
  getAllUsers,
  getUser,
  updateBio,
  deleteUser,
  follow,
  unFollow,
} from "../controllers/userController.js";
import { logIn, logOut, signUp } from "../controllers/authController.js";
import { uploadProfil } from "../controllers/uploadController.js";

import multer from "multer";

const upload = multer();
const router = express.Router();

// auth
router.post("/register", catchErrors(signUp));
router.post("/logIn", catchErrors(logIn));
router.get("/logOut", catchErrors(logOut));

// user
router.get("/allUsers", catchErrors(getAllUsers));
router.get("/user/:id", catchErrors(getUser));
router.put("/bio/:id", catchErrors(updateBio));
router.delete("/:id", catchErrors(deleteUser));
router.patch("/follow/:id", catchErrors(follow));
router.patch("/unfollow/:id", catchErrors(unFollow));

//upload
router.post("/upload", upload.single("file"), uploadProfil);

export default router;

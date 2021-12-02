import UserModel from "../models/userModel.js";
import { uploadErrors } from "./utils/errorsUtils.js";
import fs from "fs";
import { promisify } from "util";
import stream from "stream";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pipeline = promisify(stream.pipeline);

export const uploadProfil = async (req, res) => {
  let fileName;
  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType !== "image/jpg" &&
        req.file.detectedMimeType !== "image/png" &&
        req.file.detectedMimeType !== "image/jpeg"
      ) {
        throw Error("invalid file");
      }
      if (req.file.size > 500000) {
        throw Error("max size");
      }
    } catch (err) {
      const errors = uploadErrors(err);

      return res.status(201).json({ errors });
    }

    fileName = req.body.name + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(`${__dirname}/../client/build/uploads/${fileName}`)
    );
  }

  try {
    UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        } else {
          return res.status(500).send({ message: err });
        }
      }
    );
  } catch (err) {
    return console.log(err);
  }
};

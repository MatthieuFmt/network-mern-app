import UserModel from "../models/userModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// post
export const addUser = async (req, res) => {
  const user = new UserModel(req.body);
  await user.save();
  res.send(user);
};

// get
export const getUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }
  const user = await UserModel.findById(req.params.id).select("-password");
  res.send(user);
};

export const getAllUsers = async (req, res) => {
  const user = await UserModel.find().select("-password");

  res.send(user);
};

// put
export const updateBio = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  const user = await UserModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        bio: req.body.bio,
      },
    }
  );

  if (!user) {
    res.status(404).send("Aucun utilisateur trouvé");
  }
  res.status(200).send(user);
};

// delete
export const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  const user = await UserModel.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).send("Aucun utilisateur trouvé");
  }
  res.status(200).send("Utilisateur supprimé !");

  res.send(user);
};

// patch
export const follow = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow)
  ) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  // ajoute à la liste des followers
  const followers = await UserModel.findByIdAndUpdate(req.params.id, {
    $addToSet: { following: req.body.idToFollow },
  });
  // ajoute à la liste des followings
  const following = await UserModel.findByIdAndUpdate(req.body.idToFollow, {
    $addToSet: { followers: req.params.id },
  });

  res.status(200).send("Abonnement effectué");
};

export const unFollow = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnfollow)
  ) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  // ajoute à la liste des followers
  const follower = await UserModel.findByIdAndUpdate(req.params.id, {
    $pull: { following: req.body.idToUnfollow },
  });

  // ajoute à la liste des followings
  const following = await UserModel.findByIdAndUpdate(req.body.idToUnfollow, {
    $pull: { followers: req.params.id },
  });

  res.status(200).send("Désabonnement effectué");
};

export const signUpErrors = (err) => {
  let errors = { pseudo: "", password: "" };

  if (err.message.includes("pseudo")) {
    errors.pseudo = "Pseudo incorrect";
  }
  if (err.message.includes("password")) {
    errors.password = "Mot de passe incorrect";
  }
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo")) {
    errors.pseudo = "Pseudo déjà pris";
  }
  return errors;
};

export const logInErrors = (err) => {
  let errors = { pseudo: "", password: "" };

  if (err.message.includes("pseudo")) {
    return (errors.pseudo = "Pseudo inconnu");
  }
  if (err.message.includes("password")) {
    return (errors.password = "Mot de passe incorrect");
  }

  return errors;
};

export const uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file"))
    errors.format = "Format accepté: jpg, jpeg, png";

  if (err.message.includes("max size"))
    errors.maxSize = "Taille maximum: 500ko";

  return errors;
};

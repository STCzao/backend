const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    //Crear payload
    const payload = { uid };

    //Generar JWT
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      { expiresIn: "2h" },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se puede generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};

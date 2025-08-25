const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  //Preguntar si enviaron el token
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  //Si enviaron el token
  try {
    //Verificar el token y el uid
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //Obtener los datos del usuario autenticado (uid)
    const usuario = await Usuario.findById(uid);

    //Validar si el usuario existe
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no valido",
      });
    }

    //Validar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no valido",
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no es valido",
    });
  }
};

module.exports = {
  validarJWT,
};

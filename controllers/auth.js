const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    //Verificar si el correo existe
    if (!usuario) {
      return res.status(400).json({
        msg: "Correo o password incorrectos",
      });
    }

    //Verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Correo o password incorrectos | usuario inactivo",
      });
    }

    //Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Correo o password incorrectos | usuario incorrecta",
      });
    }

    //Generar el token
    const token = await res.json({
      msg: "Login OK",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador del sistema",
    });
  }
};



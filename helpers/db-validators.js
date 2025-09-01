const Usuario = require("../models/usuario");
const Rol = require("../models/rol");
const categoria = require("../models/categoria");

//Validar email
const emailExiste = async (correo) => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail)
    throw new Error(`El correo ${correo} ya se encuentra en la base de datos`);
};

//Validar rol
const esRolValido = async (rol) => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe en la base de datos`);
  }
};

//Validar si el usuario con el id pasado existe
const usuarioExiste = async (id) => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`El id ${id} no corresponde a ningun usuario registrado`);
  }
};

//Validar si la categoria del curso existe
const categoriaExiste = async (id) => {
  const existeCategoria = await categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(
      `El id ${id} no corresponde a ninguna categoria registrada`
    );
  }
};

module.exports = {
  emailExiste,
  usuarioExiste,
  esRolValido,
  categoriaExiste,
};

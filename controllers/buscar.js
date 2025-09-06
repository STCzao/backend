const { response, request } = require("express");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Curso = require("../models/curso");

//Definir las colecciones permitidas para buscar
const coleccionesPermitidas = ["usuarios", "categorias", "cursos"];

//Buscar usuarios
const buscarUsuarios = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    msg: "Usuarios encontrados",
    results: usuarios,
  });
};

//Buscar categorias
const buscarCategorias = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  });

  res.json({
    msg: "Categorias encontrados",
    results: categorias,
  });
};

//Buscar cursos
const buscarCursos = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");

  const cursos = await Curso.find({
    $or: [{ nombre: regex }, { descripcion: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    msg: "Cursos encontrados",
    results: cursos,
  });
};

//Funcion principal para las busquedas
const buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  //Validar la coleccion
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  //En funcion de la coleccion, buscar los terminos
  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "cursos":
      buscarCursos(termino, res);
      break;
    default:
      res.status(500).json({
        msg: "Hubo un error al hacer la busqueda",
      });
      break;
  }
};

module.exports = {
  buscar,
};

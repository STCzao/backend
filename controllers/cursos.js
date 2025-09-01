const { response, request } = require("express");
const Curso = require("../models/curso");

//Get para obtener todos los curso paginados
const cursosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, cursos] = await Promise.all([
    Curso.countDocuments(query),
    Curso.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "correo")
      .populate("categoria", "nombre"),
  ]);

  res.json({
    total,
    cursos,
  });
};

//Obtener un curso por su ID
const cursoGet = async (req = request, res = response) => {
  const { id } = req.params;

  const curso = await Curso.findById(id)
    .populate("usuario", "correo")
    .populate("categoria", "nombre");

  res.json({
    curso,
  });
};

//Crear curso
const cursoPost = async (req = request, res = response) => {
  const { precio, categoria, descripcion, img } = req.body;
  const nombre = req.body.nombre.toUpperCase();

  const cursoDB = await Curso.findOne({ nombre });

  //Validar si el curso existe
  if (cursoDB) {
    return res.status(400).json({
      msg: `El curso ${cursoDB.nombre} ya existe`,
    });
  }

  //Generar la data a guardar
  const data = {
    nombre,
    categoria,
    precio,
    descripcion,
    img,
    usuario: req.usuario._id,
  };

  const curso = new Curso(data);

  //Grabar en la base de datos
  await curso.save();

  res.status(201).json({
    curso,
    msg: "Curso creado con exito!",
  });
};

//Actualizar curso
const cursoPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { categoria, precio, descripcion, img, destacado } = req.body;

  const usuario = req.usuario._id;

  let data = {
    destacado,
    categoria,
    precio,
    descripcion,
    img,
    usuario,
  };

  //El nombre lo guardamos con mayusculas
  if (req.body.nombre) {
    data.nombre = req.body.nombre.toUpperCase();
  }

  const curso = await Curso.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    curso,
    msg: "El curso se actualizo con exito",
  });
};

//Borrar el curso
const cursoDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const cursoBorrado = await Curso.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    msg: `El curso ${cursoBorrado.nombre} se ha borrado exitosamente `,
  });
};

module.exports = {
  cursoGet,
  cursosGet,
  cursoPost,
  cursoPut,
  cursoDelete,
};

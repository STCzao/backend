const { Router } = require("express");
const {
  cursosGet,
  cursoGet,
  cursoPost,
  cursoPut,
  cursoDelete,
} = require("../controllers/cursos");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
const { cursoExiste } = require("../helpers/db-validators");

const router = Router();

router.get("/", cursosGet);

router.get(
  "/:id",
  [
    check("id", "El Id no es valido").isMongoId(),
    check("id").custom(cursoExiste),
    validarCampos,
  ],
  cursoGet
);

router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  cursoPost
);

router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(cursoExiste),
    validarCampos,
  ],
  cursoPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(cursoExiste),
    validarCampos,
  ],
  cursoDelete
);

module.exports = router;

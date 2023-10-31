import { LIBROS_JSON, PORT } from "./config.js";
import express from "express";
import { ProductosManager } from "./ProductosManager.js";

const pro = new ProductosManager(LIBROS_JSON);
const app = express();

app.get("/libros", async (req, res) => {
  const limit = req.query.limit;
  const genero = req.query.genero;
  try {
    const libros = await pro.getAll({ genero, limit });
    res.json(libros);
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

app.get("/libros/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const libros = await pro.getById(id);
    res.json(libros);
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
app.listen(PORT, () => {
  console.log(`Conectado en puerto ${PORT}`);
});

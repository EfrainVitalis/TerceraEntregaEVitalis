import fs from "fs/promises";

export class ProductosManager {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async getAll(query = {}) {
    const json = await fs.readFile(this.ruta, "utf-8");
    const data = JSON.parse(json);
    //Desestructurar = Destructuring assignment
    const { genero, limit } = query;
    if (genero) {
      const generoExistente = data.some((l) => l.genero === genero);
      if (!generoExistente) {
        throw new Error(`No tenemos ese género`);
      }
      return data.filter((l) => l.genero === genero);
    }

    if (limit) {
      if (isNaN(limit)) {
        throw new Error(`Limite invalido`);
      }

      return data.slice(0, limit);
    }
    return data;
  }

  async getById(id) {
    const json = await fs.readFile(this.ruta, "utf-8");
    const libros = JSON.parse(json);
    const libbuscados = libros.find((l) => l.id === id);
    if (!libbuscados) throw new Error(`Libro con id no encontrado ${id}`);
    return libbuscados;
  }
}

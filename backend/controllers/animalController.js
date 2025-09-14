const db = require("../db");
const cloudinary = require("../config/cloudinary");

const createAnimal = async (req, res) => {
  const protectoraId = req.protectoraId;
  if (!protectoraId) return res.status(401).json({ error: "No autorizado" });

  const {
    name,
    chipNumber,
    species,
    sterilizedDate,
    location,
    illnesses = [],
  } = req.body;
  try {
    console.log("POST /animals recibido:", req.body);
    let photoUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      photoUrl = result.secure_url;
    }
    const insertAnimalQuery =
      "INSERT INTO animal (nombre, chip, especie, fecha_esterilizacion, foto, lugar, protectoras_idprotectoras) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(insertAnimalQuery, [
      name,
      chipNumber,
      species,
      sterilizedDate,
      photoUrl,
      location,
      protectoraId,
    ]);
    console.log("Resultado del INSERT:", result);

    res.status(201).json({
      message: "Animal guardado correctamente",
      id: result.insertId,
      photoUrl,
    });
  } catch (error) {
    console.error("❌ Error en createAnimal:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAnimals = async (req, res) => {
  const protectoraId = req.protectoraId;
  if (!protectoraId) {
    return res.status(401).json({ error: "No autorizado" });
  }
  try {
    const getAnimalQuery =
      "SELECT idanimal AS id, nombre AS name, especie AS species, foto AS image, chip AS chipNumber, fecha_esterilizacion AS sterilizedDate, lugar AS location FROM animal WHERE protectoras_idprotectoras =? ORDER BY idanimal DESC";
    const [rows] = await db.query(getAnimalQuery, [protectoraId]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAnimalById = async (req, res) => {
  const protectoraId = req.protectoraId;
  if (!protectoraId) {
    return res.status(401).json({ error: "No autorizado" });
  }
  const { id } = req.params;
  try {
    const query = `SELECT idanimal AS id, nombre AS name, especie AS species, foto AS image, chip AS chipNumber, fecha_esterilizacion AS sterilizedDate, lugar AS location FROM animal WHERE idanimal = ? AND protectoras_idprotectoras = ?`;
    const [rows] = await db.query(query, [id, protectoraId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "ANimal no encontrado " });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAnimal = async (req, res) => {
  const protectoraId = req.protectoraId;
  const {id} = req.params;
  console.log (id, protectoraId)
  try{
    const [result] = await db.query (
      "DELETE FROM animal WHERE idanimal = ? AND protectoras_idprotectoras =?",
      [id, protectoraId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json ({ error: "Animal no encontrado"})
    }
    res.json({ message: "Animal eliminado correctamenmte"})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};


module.exports = {
  createAnimal,
  getAnimals,
  getAnimalById,
  deleteAnimal,
};

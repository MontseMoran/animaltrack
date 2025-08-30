const db = require('../db')

const createAnimal = async (req, res) => {
    const protectoraId = req.protectoraId
    if (!protectoraId) return res.status(401).json({error: 'No autorizado'})

        const { name, chipNumber, species,  sterilizedDate, image, location, illnesses = [] } = req.body;
    try {
       
      
  console.log("POST /animals recibido:", req.body);
    const insertAnimalQuery = 'INSERT INTO animal (nombre, chip, especie, fecha_esterilizacion, foto, lugar, protectoras_idprotectoras) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.query (insertAnimalQuery, [name, chipNumber, species,  sterilizedDate, image, location, protectoraId ])
  console.log("Resultado del INSERT:", result);

    res.status(201).json({
        message: 'Animal guardado correctamente',
        id: result.insertId
    });
  } catch (error) {
     console.error("❌ Error en createAnimal:", error); 
    res.status(500).json ({error: error.message})
  }
}

const getAnimals = async (req, res) =>{
  const protectoraId= req.protectoraId 
  if (!protectoraId){
    return res.status(401).json({error: 'No autorizado'})
  }
  try{
    const getAnimalQuery =
     'SELECT idanimal AS id, nombre AS name, especie AS species, foto AS image, chip AS chipNumber, fecha_esterilizacion AS sterilizedDate, lugar AS location FROM animal WHERE protectoras_idprotectoras =? ORDER BY idanimal DESC';
     const [rows] = await db.query(getAnimalQuery, [protectoraId])
     res.status(200).json(rows);

  }catch (error){
    res.status(500).json({ error: error.message})
  }
}

module.exports = {
    createAnimal,
    getAnimals
};
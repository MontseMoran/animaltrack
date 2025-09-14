const express =require ('express');
const router = express.Router();

const {createAnimal, getAnimals, getAnimalById, deleteAnimal}= require ('../controllers/animalController')

const upload = require ('../config/multer')

router.post('/',upload.single("photo"), createAnimal);
router.get ('/', getAnimals);
router.get ('/:id', getAnimalById);
router.delete ('/:id', deleteAnimal);

module.exports = router;
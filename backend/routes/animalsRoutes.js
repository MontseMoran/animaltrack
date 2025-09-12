const express =require ('express');
const router = express.Router();
const controller = require('../controllers/animalController');
const {createAnimal, getAnimals, getAnimalById}= require ('../controllers/animalController')

router.post('/',createAnimal);
router.get ('/', getAnimals)
router.get ('/:id', getAnimalById)

module.exports = router;
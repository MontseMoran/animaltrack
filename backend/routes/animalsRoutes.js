const express =require ('express');
const router = express.Router();
const controller = require('../controllers/animalController');
const {createAnimal, getAnimals}= require ('../controllers/animalController')
router.post('/',createAnimal);
router.get ('/', getAnimals)

module.exports = router;
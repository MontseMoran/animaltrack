const express = require ('express');
const cors = require ('cors')
require('dotenv').config();

// Middleware temporal: simula que siempre es la protectora 1
function fakeProtectora(req, res, next) {
  req.protectoraId = 1; 
  next();               
}

const app = express();
const PORT = process.env.PORT || 4000;
const animalsRouter = require('./routes/animalsRoutes')

app.use(cors());
app.use(express.json({limit: '10mb'}));

app.use('/animals', fakeProtectora, animalsRouter);
const db =require ('./db')
app.get('/', (req, res) => {
  res.send('Servidor Backend AnimalTrack funcionando 🚀');   
});
app.listen(PORT, () =>{
    console.log (`✅ Backend escuchando en http://localhost:${PORT}`)
})
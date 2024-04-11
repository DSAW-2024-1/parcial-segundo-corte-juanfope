const express = require("express");
const axios = require("axios"); //libreria para solicitudes http a la API de capcoins
const app = express();
const PORT = 8080;

const users = [
  { nombre: 'SAMUEL', apellido: 'ACERO GARCIA' },
  { nombre: 'DAREK', apellido: 'ALJURI MARTINEZ' },
  { nombre: 'JUAN FELIPE', apellido: 'CEPEDA URIBE' },
  { nombre: 'ANA MARIA', apellido: 'CHAVES PEREZ' },
  { nombre: 'CARLOS DAVID', apellido: 'CRUZ PAVAS' },
  { nombre: 'DIEGO NORBERTO', apellido: 'DIAZ ALGARIN' },
  { nombre: 'JORGE ESTEBAN', apellido: 'DIAZ BERNAL' },
  { nombre: 'DAVID ESTEBAN', apellido: 'DIAZ VARGAS' },
  { nombre: 'JUAN JOSE', apellido: 'FORERO PEÑA' },
  { nombre: 'SANTIAGO', apellido: 'GUTIERREZ DE PIÑERES BARBOSA' },
  { nombre: 'SAMUEL ESTEBAN', apellido: 'LOPEZ HUERTAS' },
  { nombre: 'MICHAEL STEVEN', apellido: 'MEDINA FERNANDEZ' },
  { nombre: 'KATHERIN JULIANA', apellido: 'MORENO CARVAJAL' },
  { nombre: 'JUAN PABLO', apellido: 'MORENO PATARROYO' },
  { nombre: 'NICOLAS ESTEBAN', apellido: 'MUÑOZ SENDOYA' },
  { nombre: 'SANTIAGO', apellido: 'NAVARRO CUY' },
  { nombre: 'JUAN PABLO', apellido: 'PARRADO MORALES' },
  { nombre: 'DANIEL SANTIAGO', apellido: 'RAMIREZ CHINCHILLA' },
  { nombre: 'JUAN PABLO', apellido: 'RESTREPO COCA' },
  { nombre: 'GABRIELA', apellido: 'REYES GONZALEZ' },
  { nombre: 'JUAN JOSE', apellido: 'RODRIGUEZ FALLA' },
  { nombre: 'VALENTINA', apellido: 'RUIZ TORRES' },
  { nombre: 'MARIANA', apellido: 'SALAS GUTIERREZ' },
  { nombre: 'SEBASTIAN', apellido: 'SANCHEZ SANDOVAL' },
  { nombre: 'JOSUE DAVID', apellido: 'SARMIENTO GUARNIZO' },
  { nombre: 'SANTIAGO', apellido: 'SOLER PRADO' },
  { nombre: 'MARIA FERNANDA', apellido: 'TAMAYO LOPEZ' },
  { nombre: 'DEIVID NICOLAS', apellido: 'URREA LARA' },
  { nombre: 'ANDRÉS', apellido: 'AZCONA' }
];
app.use(express.json());
 
app.get('/', (req, res) => {
  console.log("accedio sin problemas a /")
  res.status(200).send("Ha accedido a localhost:8080")
  //res.send("Ha accedido a localhost:8080")
});

// Endpoint coins
app.get('/coin/:coinName', async (req, res) => {
  try {
    const coinName = req.params.coinName.toLowerCase();
    const response = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`);
    const coinData = response.data.data;
    const priceUSD = coinData.priceUsd;
    return res.send(`El precio en dólares de ${coinName} para el día de hoy es ${priceUSD}`);
  } catch (error) {
    console.error('El nombre de la moneda no fue encontrado en la base de datos', error.message);
    return res.status(404).send('El nombre de la moneda no fue encontrado en la base de datos');
  }
});

//endpoint usuarios y conteo
app.get('/users/:count', async (req, res) => {
  const count = parseInt(req.params.count) || 5;
  const sort = req.query.sort || 'ASC';

  const sortedUsers = users.sort((a, b) => {
    if (sort === 'ASC') {
      return a.apellido.localeCompare(b.apellido);
    } else {
      return b.apellido.localeCompare(a.apellido);
    }
  });
  const selectedUsers = sortedUsers.slice(0, count);

  return res.json(selectedUsers);
});

//endpoint usuarios con post
app.post('/users', (req, res) => {
  const { nombre, apellido, correo, ciudad = 'Bogotá', país = 'Colombia' } = req.body;
  const nuevoUsuario = {
    nombre,
    apellido,
    correo,
    ciudad,
    país,
  };
  res.status(201).json(nuevoUsuario);
});

//Error catchers
app.use((req, res, next) => {
  const error = new Error("Endpoint no encontrado");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(
    PORT,
    () => console.log(`server live at port:${PORT}`)
)
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 8080;
  
// Endpoint para obtener la lista de activos
app.get('/coin/:coinName', async (req, res) => {
  try {
    const coinName = req.params.coinName.toLowerCase();
    const response = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`);
    const coinData = response.data.data;

    if (!coinData) {
      return res.status(404).send('El nombre de la moneda no fue encontrado en la base de datos');
    }

    const priceUSD = coinData.priceUsd;
    return res.send(`El precio en dólares de ${coinName} para el día de hoy es ${priceUSD}`);
  } catch (error) {
    console.error('Error al consultar la API de CoinCap:', error.message);
    return res.status(500).send('Error al consultar la API de CoinCap');
  }
});
  
app.listen(
    PORT,
    () => console.log(`server live at port:${PORT}`)
)
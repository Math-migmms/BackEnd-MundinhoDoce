const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MercadoPago = require('mercadopago');

const app = express();

// Para permitir qualquer origem (não recomendado para produção)
app.use(cors());

// Ou especificar a origem permitida
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

// Substitua com suas credenciais do Mercado Pago
MercadoPago.configure({
  access_token: 'TEST-2684905602430236-052513-51d07b1caa42a7938ab7e2a9f13a7f98-135153905',
  
});

app.post('/create_payment', async (req, res) => {
    const products = req.body;
  
    const preference = {
      items: products.map(product => ({
        title: product.title,
        unit_price: product.price,
        quantity: product.quantity,
      })),
    };
  try {
    const payment = await mercadopago.preferences.create(preference);
    res.status(200).send({ id: payment.body.id });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Creating payment failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

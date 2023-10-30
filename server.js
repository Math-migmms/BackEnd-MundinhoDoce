const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');  // Note que aqui é tudo em minúsculas

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configure suas credenciais
mercadopago.configure({  // Note que aqui é tudo em minúsculas
  access_token: 'TEST-2684905602430236-052513-51d07b1caa42a7938ab7e2a9f13a7f98-135153905'
});

app.post('/create_payment', async (req, res) => {
  const products = req.body;

  const preference = {
    items: products.map(product => ({
      title: product.title,
      unit_price: parseFloat(product.price),
      quantity: parseInt(product.quantity),
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

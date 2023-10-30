const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Substitua com suas credenciais do Mercado Pago
mercadopago.configure({
  access_token: 'TEST-2684905602430236-052513-51d07b1caa42a7938ab7e2a9f13a7f98-135153905',
  
});

app.post('/create_payment', async (req, res) => {
  const { title, quantity, price } = req.body;

  const preference = {
    items: [
      {
        title,
        unit_price: price,
        quantity,
      },
    ],
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

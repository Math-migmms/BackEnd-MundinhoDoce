const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Substitua com suas credenciais do Mercado Pago
mercadopago.configure({
  access_token: 'SEU_ACCESS_TOKEN_AQUI'
});

app.post('/create_payment', async (req, res) => {
  const products = req.body;

  const preference = {
    items: products.map(product => ({
      title: product.title,
      unit_price: product.price,
      quantity: product.quantity,
    })),
    back_urls: {
      success: 'http://localhost:3000/success',
      failure: 'http://localhost:3000/failure',
      pending: 'http://localhost:3000/pending',
    }
  };

  try {
    const payment = await mercadopago.preferences.create(preference);
    console.log("Payment Preference: ", payment);
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

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002; 

app.use(bodyParser.json());
app.use(cors());

// String de conexão MongoDB
const mongoUri = 'mongodb://localhost:27017/productdb';

// Conectar ao MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  available: Boolean,
});

const Product = mongoose.model('Product', productSchema);

app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ price: 1 });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

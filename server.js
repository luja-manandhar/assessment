const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Product list
let productList = [
  { id: 1, name: "Product 1", description: "Description for Product 1", price: 10 },
  { id: 2, name: "Product 2", description: "Description for Product 2", price: 20 },
  { id: 3, name: "Product 3", description: "Description for Product 3", price: 30 }
];

// Handlers
app.get('/products', (req, res) => {
  res.json(productList);
});

app.post('/add-product', (req, res) => {
  const newProduct = req.body;

  if (!newProduct || !newProduct.name || !newProduct.description || !newProduct.price) {
    return res.status(400).send('Invalid product data');
  }

  newProduct.id = productList.length;

  productList.push(newProduct);
  res.json(productList);
});

app.post('/edit-product', (req, res) => {
  const editedProduct = req.body;

  if (!editedProduct || !editedProduct.id || !editedProduct.name || !editedProduct.description || !editedProduct.price) {
    return res.status(400).send('Invalid product data');
  }

  let found = false;
  productList = productList.map(product => {
    if (product.id === editedProduct.id) {
      found = true;
      return editedProduct;
    }
    return product;
  });

  if (!found) {
    return res.status(404).send('Product not found');
  }

  res.json(productList);
});

app.get('/product/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);

  if (isNaN(productId)) {
    return res.status(400).send('Invalid product ID');
  }

  const product = productList.find(p => p.id === productId);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.json(product);
});

// Delete product handler
app.delete('/product/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);

  if (isNaN(productId)) {
    return res.status(400).send('Invalid product ID');
  }

  const productIndex = productList.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).send('Product not found');
  }

  productList.splice(productIndex, 1);
  res.json(productList);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});

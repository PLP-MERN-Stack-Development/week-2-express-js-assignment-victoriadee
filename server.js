// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
//const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
app.get('/products',(req, res) => {
    res.json(products);
})
// GET /api/products/:id - Get a specific product
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));

   res.json(products);}
)
// POST /api/products - Create a new product
app.post('/products/:id', (req, res) => {
  const { name, price, description } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description: description || ''
  };
})
// PUT /api/products/:id - Update a product
app.put('/products',(req, res) => {
    const product = products.find( p => p.id === Number(req.params.id)) ;
    products.name = req.body.name;
    res.json(products);
});
// DELETE /api/products/:id - Delete a product
app.delete('/products',(req, res) => {
    
    product = products.filter(p => p.id != req.params.id);
    res.status(204).send();
});
// Example route implementation for GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// TODO: Implement custom middleware for:
app.use((req, res, next) => {
     console.log(`${req.method} ${req.url}`);
     next()
})
// - Request logging
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token !== 'Bearer mysecrettoken') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
// - Authentication
app.get('/products', authenticate, (req, res) => {
  res.json([{ id: 1, name: 'Laptop' }]);
});

// - Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

// Export the app for testing purposes
module.exports = app; 
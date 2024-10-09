const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Product = require('./model/Product');
const Order = require('./model/order');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Sample data (You can replace this with your database entries later)
const sampleProducts = [
  {
    name: "Men's T-Shirt",
    price: 450,
    image: 'https://shorturl.at/Iodih',
    category: 'Men',
  },
  {
    name: "Men's Jeans",
    price: 1100,
    image: 'https://shorturl.at/REaxk',
    category: 'Men',
  },
  {
    name: "Women's Dress",
    price: 2000,
    image: 'https://shorturl.at/Cd5lt',
    category: 'Women',
  },
  {
    name: "Women's Saare",
    price: 3000,
    image: 'https://shorturl.at/JoeLu',
    category: 'Women',
  },
  {
    name: "Men's Shirt",
    price: 500,
    image: 'https://shorturl.at/uEnps',
    category: 'Men',
  },
  {
    name: "Women's Top",
    price: 400,
    image: 'https://shorturl.at/l1kZz',
    category: 'Women',
  },
];

// Seed the database with sample data (run only once)
// Uncomment the line below to seed the database
const seedDatabase = async () => {
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
};
seedDatabase();

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    console.log("Products fetched:", products); // Log here to verify
    res.json(products); // Ensure this includes the _id field
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST /api/orders
// POST /api/orders
app.post('/api/orders', async (req, res) => {
  const { productId, name, price, quantity } = req.body;

  if (!productId || !name || !price || !quantity) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const order = new Order({ productId, name, price, quantity });
    const savedOrder = await order.save();
    res.status(201).json({ orderId: savedOrder._id });
    console.log("Received order data:", req.body);

  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Failed to save order' });
  }
});

  
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

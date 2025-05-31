require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conected!'))
  .catch(err => console.error(err));

app.use('/api/products', productRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is on the port ${port}`);
});

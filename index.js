const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

mongoose.connect("mongodb+srv://admin_rondina:admin169@rondina-b169.sl6hj.mongodb.net/capstone2-ecommerce?retryWrites=true&w=majority", {

			useNewUrlParser : true,
			useUnifiedTopology : true

});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));

db.once('open', () => console.log('Connected to MongoDB'));

//middlewares
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


app.listen(port, () => console.log(`Server is running at port ${port}`))

//https://fast-hollows-37257.herokuapp.com/ 
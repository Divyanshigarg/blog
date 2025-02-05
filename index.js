const express = require('express');
require('dotenv').config()
const app = express();
const { connectMongo } = require('../backend/connect/db')

//routes import
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const errorHandler = require('./middleware/errorMiddleware');

//routes
app.use('/api/user',userRoutes)
app.use('/api/blog',blogRoutes)

//db connection
connectMongo();

app.use(errorHandler);

//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Listening to the ${port}`)
} )
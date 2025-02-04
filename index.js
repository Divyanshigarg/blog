const express = require('express');
const app = express();
const { connectMongo } = require('../backend/connect/db')
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req,res) =>{
     console.log("Hello World")
})

app.use('/api/user',userRoutes)
app.use('/api/blog',blogRoutes)

connectMongo();

const port = 3000

app.listen(port, () => {
   console.log(`Listening to the ${port}`)
} )
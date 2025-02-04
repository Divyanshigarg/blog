const mongoose = require("mongoose");
require('dotenv').config()

let url = process.env.MONGODB_URL;
exports.connectMongo = async () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("DB Connected");
        })
        .catch((error) => {
            console.error("Error connecting to the database:", error);
        });
};

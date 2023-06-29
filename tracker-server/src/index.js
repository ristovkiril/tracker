require('./models/User')

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes");

const uri = "mongodb+srv://ristovkiril:gQZtQ5kHZsYSaaV1@cluster0.alk7m6g.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);

mongoose.connection.on("connected", () => {
   console.log("DB CONNECTED");
});
mongoose.connection.on("error", (error) => {
   console.log("DB ERROR: ", error);
});

const app = express();

// First parse request
app.use(bodyParser.json());
app.use(authRoutes);

app.get("/", (req, res) => {
    res.send("Hi there");
})

app.listen(3000 , () => {
    console.log("Listen on port 3000 http://localhost:3000")
})
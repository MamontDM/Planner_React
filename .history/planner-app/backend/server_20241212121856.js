const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 5000;

mongoose
    .connect("mongodb://localhost:27017/ShipDB", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

const shipSchema = new mongoose.Schema({
    name: String,
    level: Number,
    nation: { name: String, icon: String },
    class: { name: String, icon: String },
});

const Ship = mongoose.model("Ship", shipSchema);
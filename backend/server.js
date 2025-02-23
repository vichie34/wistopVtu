import express from 'express'
import path from 'path'
const app = express()

// ROUTING
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "about.html"))
})

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "dashboard.html"))
})

app.get("/faq", (req, res) => {
    res.sendFile(path.join(__dirname, "faq.html"))
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "register.html"))
})

app.get("/services", (req, res) => {
    res.sendFile(path.join(__dirname, "blog.html"))
})

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "contact.html"))
})

app.get("/verify", (req, res) => {
    res.sendFile(path.join(__dirname, "verify.html"))
})

app.get("/setting", (req, res) => {
    res.sendFile(path.join(__dirname, "setting.html"))
})


// API CALLS
app.get("/api/vtu", (req, res) =>{


    res.json(vtu)
})

app.get("/api/nin", (req, res) =>{


    res.json(nin)
})


app.get("/api/payment", (req, res) =>{


    res.json(payment)
})


// SERVER CHECK
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server at http://localhost${port}`)
})







// npm init -y
// npm install express mongoose cors


// Create a new file server.js and add the following code:


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function () {
//   console.log('Connected to MongoDB');

//   const cardSchema = new mongoose.Schema({
//     title: String,
//     description: String,
// });

// const Card = mongoose.model('Card', cardSchema);

// app.get('/api/cards', async (req, res) => {
//   const cards = await Card.find();
//   res.json(cards);
// });

// app.post('/api/cards', async (req, res) => {
//   const card = new Card(req.body);
//   await card.save();
//   res.json(card);
// });

// app.listen(3001, () => {
//   console.log('Server listening on port 3001');
// });
// });


// Frontend (Netlify-hosted)
// Update your frontend code to make API calls to your backend:


// fetch('/api/cards')
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));


const express = require("express");
const cors = require('cors');
const app = express();

require("dotenv").config();

let dbConnect = require("./dbConnect");
let userRoutes = require(".routes/userRoutes");
// let bgRoutes = require("./routes/bgRoutes")

app.use(cors())

app.use(express.json())

app.use("/api/users", userRoutes);
//app.use("/api/background", bgRoutes);

app.get('/test', (req, res) => {
    res.json('test ok')
});

// http://localhost:4000/api/users/create Adds a POST route to create a new user
app.post('/signup', (req,res) => {
const {email, name, password} = req.body;
res.json(email, name, password);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
console.log(`Server is running on port
${PORT}.`);
});



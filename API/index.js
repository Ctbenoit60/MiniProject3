const express = require("express");
const cors = require('cors');
const app = express();

require("dotenv").config();

let dbConnect = require("./dbConnect");
let userRoutes = require("./routes/userRoutes");
// let bgRoutes = require("./routes/bgRoutes")

app.use(cors())

app.use(express.json())

app.use("/api/users", userRoutes);
//app.use("/api/background", bgRoutes);

app.get('/test', (req, res) => {
    res.json('test ok')
});

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
console.log(`Server is running on port
${PORT}.`);
});



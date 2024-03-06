const express = require("express");
const cors = require('cors');
const app = express();

require("dotenv").config();

let dbConnect = require("./dbConnect");
let userRoutes = require("./routes/userRoutes");
let eventRoutes = require("./routes/eventsRoutes");


app.use(cors())

app.use(express.json())

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

app.get('/test', (req, res) => {
    res.json('test ok')
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
console.log(`Server is running on port
${PORT}.`);
});



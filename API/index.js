const express = require("express");
const cors = require('cors');
const app = express();


app.use(cors())

app.use(express.json())

app.get('/test', (req, res) => {
    res.json('test ok')
});

app.post(' ', (req,res) => {
const {email, name, password} = req.body;
res.json(email, name, password);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
console.log(`Server is running on port
${PORT}.`);
});

///This is where I left off. Getting a 404 when trying to post

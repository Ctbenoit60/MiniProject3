const express = require("express");
const app = express();

app.use(express.json());

app.get('test', (req, res) => {
    res.json('test ok')
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port
${PORT}.`);
});

///This is where I left off. Need to figure out if I want to use MySQL or MongoDb. 

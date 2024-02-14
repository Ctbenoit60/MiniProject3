const express = require("express");
const cors = require('cors');
const app = express();


app.use(cors({
    credentials: true,
    origin:'http://127.0.0.1:5173',
}));

app.get('/test', (req, res) => {
    res.json('test ok')
});

app.listen(4000);

///This is where I left off. Need to figure out if I want to use MySQL or MongoDb. 

const express = require('express');
require('dotenv').config();
var cors = require('cors');
const { default: mongoose } = require('mongoose');
const userModel = require('./models/user');
const bcrypt = require('bcryptjs');
const app = express();

const userSalt = bcrypt.genSaltSync(10);

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)


app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const user = await userModel.create({
            name, 
            email, 
            password: bcrypt.hashSync(password, userSalt),
        });
    }
    catch(e){
        res.status(400).json(e);
    }
    
});

app.listen(4000)
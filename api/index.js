const express = require('express');
require('dotenv').config();
var cors = require('cors');
const { default: mongoose } = require('mongoose');
const userModel = require('./models/user');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');

const userSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'secret';

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
        res.status(422).json(e);
    }
    
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if (user){
        if (bcrypt.compareSync(password, user.password)){
            jwt.sign({email:user.email, id:user._id}, jwtSecret, {}, (err, token)=>{
                if (err) throw err;
                res.cookie('token', token).json('password ok');
            });
        }
        else{
            res.status(422).json('password not ok');
        }
    }
    else{
        res.json('user not found');
    }
});

app.listen(4000)
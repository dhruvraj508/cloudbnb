const express = require('express');
require('dotenv').config();
var cors = require('cors');
const { default: mongoose } = require('mongoose');
const userModel = require('./models/user');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');


const userSalt = bcrypt.genSaltSync(10);
const jwtSecret = "secret";

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGO_URL)

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
            jwt.sign({
                email:user.email, 
                id:user._id, 
            }, jwtSecret, {}, (err, token)=>{
                if (err) throw err;
                res.cookie('token', token).json(user);
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

app.get('/profile', async (req, res) => {
    const {token} = req.cookies;
    if (token){
        jwt.verify(token, jwtSecret, {}, async (err, user)=>{
            if (err) throw err;
            const {name, email, _id} = await userModel.findById(user.id);
            res.json({name, email, _id});
        });
    }
    else {
        res.json(null);
    }
    // res.json({token});
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});


app.post('/upload-by-url', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    });
    res.json(newName);
})

app.listen(4000)
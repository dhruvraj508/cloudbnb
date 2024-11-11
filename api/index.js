const express = require('express');
require('dotenv').config();
var cors = require('cors');
const { default: mongoose } = require('mongoose');
const userModel = require('./models/user');
const placeModel = require('./models/place');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const PlaceModel = require('./models/place');
const BookingModel = require('./models/booking');

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

function getUserFromToken(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, user)=>{
            if (err) throw err;
            resolve(user);
        });
    });
    
}

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

const photosMiddleware = multer({dest:'uploads/'});

app.post('/upload', photosMiddleware.array('photos',100), (req, res) => {
    // const files = req.files;
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++){
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const newPath = path + '.' + parts[parts.length - 1];
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    res.json(uploadedFiles);    
});

app.post('/listings', (req, res) => {
    const {token} = req.cookies;
    const {title, address, addedPhotos, 
        description, price, perks, checkInTime, 
        checkOutTime, maxGuests, extraInfo} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, user)=>{
        if (err) throw err;
        const placeDoc = await placeModel.create({
            owner: user.id,
            title, address, photos: addedPhotos, 
            description, price, perks, checkIn: checkInTime, 
            checkOut: checkOutTime, maxGuests, miscInfo: extraInfo 
        });
        res.json(placeDoc);
    });
    
});

app.get('/user-listings', async (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, user)=>{
        const {id} = user;
        res.json(await PlaceModel.find({owner:id}));
    });
});

app.get('/listings/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await PlaceModel.findById(id));
});

app.put('/listings', async (req, res) => {
    const {token} = req.cookies;
    const {
        id, title, address, addedPhotos, 
        description, price, perks, checkInTime, 
        checkOutTime, maxGuests, extraInfo
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, user)=>{
        const placeDoc = await PlaceModel.findById(id);
        // res.json(placeDoc.owner);

        if (user.id === placeDoc.owner.toString()){
            placeDoc.set({
                title, address, photos: addedPhotos, 
                description, price, perks, checkIn: checkInTime, 
                checkOut: checkOutTime, maxGuests, miscInfo: extraInfo
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
});

app.get('/listings', async (req, res) => {
    res.json(await PlaceModel.find());
});


app.post('/bookings', async (req, res) => {
    const user = await getUserFromToken(req);
    const {
        place, checkInTime, 
        checkOutTime, numberOfGuests, 
        fullName, mobile, 
        price
    } = req.body;
    BookingModel.create({
        place, checkInTime, 
        checkOutTime, numberOfGuests, 
        fullName, mobile, 
        price, user: user.id
    }).then((doc)=> {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});



app.get('/bookings', async (req, res) => {
    const user = await getUserFromToken(req);
    res.json(await BookingModel.find({user: user.id}).populate('place') );
});

app.listen(4000)
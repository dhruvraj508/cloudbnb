const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place'},
    user : {type: mongoose.Schema.Types.ObjectId, required: true},
    checkInTime : {type: Date, required: true},
    checkOutTime : {type: Date, required: true},
    fullName : {type: String, required: true},
    mobile : {type: String, required: true},
    price : Number,
    numberOfGuests : Number,
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;
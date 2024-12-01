const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    tableNumber: {
        type: Number, // Corrected to Number
    },
    capacity: {
        type: Number, // Corrected to Number
    },
    date: {
        type: String, // Assuming this is a string; consider using Date if applicable
    },
    timeStamps: {
        type: String // Assuming this is a string; clarify if it's supposed to be Date or Object
    }
}, { timestamps: true }); // Corrected "timeStamps" to "timestamps" for the schema option

const reservation = mongoose.model("reservation", reservationSchema);

module.exports = reservation;

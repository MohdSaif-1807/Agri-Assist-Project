const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        index: {
            sparse: true
        }
    },
    lastname: {
        type: String,
        index: {
            sparse: true
        }
    },
    phonenumber: {
        type: Number,
        required: true,
        index: {
            sparse: true
        }
    },
    email: {
        type: String,
        required: true,
        index: {
            sparse: true
        }
    },
    password: {
        type: String,
        required: true,
        index: {
            sparse: true
        }
    },
    farmerId: {
        type: Number,
        required: true,
        index: {
            sparse: true
        }
    }
});

const FarmerRegister = mongoose.model('FarmerRegister', RegisterSchema);

module.exports = FarmerRegister;
const mongoose = require('mongoose')
const moment = require('moment');
const currentTime = moment().format('DD-MM-YYYY');

const LibrarySchema = mongoose.Schema({
    judul:{
        type: String,
        required: true
    },
    penerbit:{
        type: String,
        required: true
    },
    gambarCover:{
        type: String,
        required: false
    },
    tanggalTerbit:{
        type: String,
        default : currentTime
    },
    lembar:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Library',LibrarySchema)
const mongoose = require('mongoose')

const PinjamSchema = mongoose.Schema({
    NoTransaksi:{
        type: String,
        required: true
    },
    TanggalPinjam:{
        type: String,
        required: true
    },
    TanggalKembali:{
        type: String,
        required: true
    }, 
    Nim:{
        type : String,
        required : true
    },
    Nama:{
        type : String,
        required :  true
    }
})

module.exports = mongoose.model('Pinjam',PinjamSchema)
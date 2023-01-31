const mongoose = require('mongoose')

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
        required : true
    },
    lembar:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Library',LibrarySchema)
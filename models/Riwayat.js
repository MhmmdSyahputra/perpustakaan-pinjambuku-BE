const mongoose = require('mongoose')

const RiwayatSchema = mongoose.Schema({
    Riwayat:[{
        username:{
            type: String,
            required: false
        },
        gambar:{
            type: String,
            required: false
        },
        judul:{
            type: String,
            required: true
        },
        Penerbit:{
            type: String,
            required: true
        },
    }]
})

module.exports = mongoose.model('Riwayat', RiwayatSchema)
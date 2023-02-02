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
    total:{
        type: String,
        required: true
    }, 
    peminjam: [{
        username: {
          type: String,
          required: true
        },
        nim: {
          type: String,
          required: true
        }
    }],
    buku:[{
        judul:{
            type:String,
            require:true
        },
        penerbit:{
            type:String,
            require:true
        },
        gambarCover:{
            type:String,
            require:true
        },
        tanggalTerbit:{
            type:String,
            require:true
        },
        lembar:{
            type:String,
            require:true
        }
    }]
})

module.exports = mongoose.model('Pinjam',PinjamSchema)
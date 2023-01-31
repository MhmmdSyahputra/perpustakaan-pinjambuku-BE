const express = require("express");
// const Library = require("../models/Library");
const router = express();
const Pinjam = require('../models/Pinjam')

//CREATE
router.post("/", async (req, res) => {
    const newPinjam = new Pinjam({
        NoTransaksi: req.body.NoTransaksi,
        TanggalPinjam: req.body.TanggalPinjam,
        TanggalKembali: req.body.TanggalKembali,
        Nim: req.body.Nim,
        Nama: req.body.Nama,
    })

    try {
        const loan = await newPinjam.save()
        res.json(loan)
    } catch (error) {
        res.json({message: error})
    }
});

//READ
router.get("/", async (req,res)=>{
    try {
        const library = await Pinjam.find()
        res.json(library)
    } catch (error) {
        res.json({message:error})
    }
})

// //READDETAIL
// router.get("/:cateId", async (req,res)=>{
//     try {
//         const cate = await Category.find({_id:req.params.newsId})
//         res.json(cate)
//     } catch (error) {
//         res.json({message:error})
//     }
// })


module.exports = router;

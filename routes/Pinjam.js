const express = require("express");
// const Library = require("../models/Library");
const router = express();
const Pinjam = require('../models/Pinjam');
const middlewareValidation = require("./middleware");

//CREATE
router.post("/",middlewareValidation, async (req, res) => {
    // console.log(req.body);
    const newPinjam = new Pinjam({
        NoTransaksi: req.body.NoTransaksi,
        TanggalPinjam: req.body.TanggalPinjam,
        TanggalKembali: req.body.TanggalKembali,
        total: req.body.total,
        peminjam:req.body.peminjam,
        buku:req.body.buku
    })

    try {
        const loan = await newPinjam.save()
        res.json({pesan:'ok', message:'Buku Berhasil Di Pinjam'})
    } catch (error) {
        res.json({message: error})
    }
});

//READ
router.get("/:nim", async (req,res)=>{
    try {
        const library = await Pinjam.find({"peminjam.nim": req.params.nim})
        res.json(library)
    } catch (error) {
        res.json({message:error})
    }
})

//READ
router.get("/", async (req,res)=>{
    try {
        const library = await Pinjam.find()
        res.json(library)
    } catch (error) {
        res.json({message:error})
    }
})

module.exports = router;

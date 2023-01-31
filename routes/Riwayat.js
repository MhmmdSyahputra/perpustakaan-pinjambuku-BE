const express = require("express");
const router = express();
const Riwayat = require('../models/Riwayat')
// const Pinjam = require('../models/Pinjam')

//CREATE
router.post("/", async (req, res) => {
    const newNewsPost = new Riwayat({
        nameKategory: req.body.nameKategory,
        gambarKategory: req.body.gambarKategory,
        keteranganKategory: req.body.keteranganKategory,
    })

    try {
        const cate = await newNewsPost.save()
        res.json(cate)
    } catch (error) {
        res.json({message: error})
    }
});

//READ
router.get("/", async (req,res)=>{
    try {
        const pinjam = await Riwayat.find()
        res.json(pinjam)
    } catch (error) {
        res.json({message:error})
    }
})

//READDETAIL
router.get("/:cateId", async (req,res)=>{
    try {
        const cate = await Category.find({_id:req.params.newsId})
        res.json(cate)
    } catch (error) {
        res.json({message:error})
    }
})


module.exports = router;

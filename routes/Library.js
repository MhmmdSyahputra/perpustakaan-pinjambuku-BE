const express = require("express");
const router = express();
const Library = require('../models/Library')
const middlewareValidation = require('./middleware')


//CREATE 
//ROUTE UNTUK POST BUKU BARU
router.post("/",middlewareValidation, async (req, res) => {
    const newAddLibrary = new Library({
        judul: req.body.judul,
        gambarCover: req.body.gambarCover,
        lembar: req.body.lembar,
        penerbit: req.body.penerbit
    })

    try {
        const library = await newAddLibrary.save()
        res.json({status:'ok', message: 'Data Berhasil Disimpan'})
    } catch (error) {
        res.json({message: error})
    }
});


//READ
//ROUTE UNTUK MEMBUKA SEMUA BUKU
router.get("/", async (req,res)=>{
    try {
        const library = await Library.find()
        res.json(library)
    } catch (error) {
        res.json({message:error})
    }
})
 
//Detail
//ROUTE UNTUK MENGAMBIL DETAIL BUKU 
router.get("/:libraryId", async (req,res)=>{
    try {
        const id = req.params.libraryId
        const library = await Library.find({_id: id })
        res.json(library)
    } catch (error) {
        res.json({message:error})
    }
})


//UPDATE
//ROUTE UNTUK MENGUPDATE BUKU 
router.put("/:libraryId",middlewareValidation, async (req,res)=>{
    try {
        const libraryupdate = await Library.updateOne({_id:req.params.libraryId},{
            judul: req.body.judul,
            penerbit: req.body.penerbit,
            tanggalTerbit: req.body.tanggalTerbit,
            lembar: req.body.lembar
        })
        res.json({status:'ok', message: 'Data Berhasil Di Update'})
    } catch (error) {
        res.json({message:error})
    }
})


//DELETE
//ROUTE UNTUK DELETE BUKU 
router.delete("/:libraryId",middlewareValidation, async (req,res)=>{
    try {
        const libraryDelete = await Library.deleteOne({_id:req.params.libraryId})
        res.json({status:'ok', message: 'Data Berhasil Di Hapus'})
    } catch (error) {
        res.json({message:error})
    }
})

module.exports = router;

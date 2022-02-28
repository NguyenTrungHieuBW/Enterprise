const express = require('express')
const { insertObject, updateDocument, deleteObject, getDocumentById, getDocument} = require('../model/databaseControl')
const router = express.Router()
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../uploads');
    },
    filename: function(req, file, cb) {
        cb(null,file.originalname);
    }
    });
const upload = multer({storage: storage})

router.get('/addIdea',(req,res)=>{
    res.render('addIdea')
})

router.post('/addIdea',async (req,res)=>{
    const user = req.body.txtUser
    const idea = req.body.txtIdea
    const course = req.body.txtCourse
    const file = req.body.txtFile
    const objectToInsert = {
        user: user,
        idea: idea,
        course: course,
        file : file,
    }
    await insertObject("Idea", objectToInsert)
    res.redirect('ideas')
})

router.get('/ideas', async (req, res) => {
    const ideas = await getDocument("Idea")
    res.render('ideas',{model:ideas})
})

router.get('/comment/:id', async (req, res) => {
    const idValue = req.params.id
    const comments = await getCommentByIdea(idValue ,"Comment")
    res.render('comment',{model:comments})
})

router.get('/addComment',(req,res)=>{
    res.render('addComment')
})

router.get('/deleteComment/:id', async (req, res) => {
    const idValue = req.params.id
    await deleteObject(idValue, "Comment")
    res.redirect('/staff/ideas')
})

router.post('/addComment',async (req,res)=>{
    const text = req.body.txtText
    const idea = req.body.txtIdea
    const user = req.body.txtUser
    const objectToInsert = {
        text: text,
        idea: idea,
        user: user,
    }
    await insertObject("Comments", objectToInsert)
    res.redirect('/ideas')
})

module.exports = router;
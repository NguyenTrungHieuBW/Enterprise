const express = require('express')
const { insertObject, updateDocument, deleteObject, getDocumentById, getDocument} = require('../model/databaseControl')
const router = express.Router()

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
    await deleteObject(idValue, "Users")
    res.redirect('/admin/users')
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
    await insertObject("Comment", objectToInsert)
    res.redirect('/admin/comment')
})

module.exports = router;
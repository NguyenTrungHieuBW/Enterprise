const express = require('express')
const { insertObject, updateDocument, deleteObject, getDocumentById, getDocument} = require('../model/databaseControl')
const router = express.Router()

router.get('/users', async (req, res) => {
    const users = await getDocument("Users")
    console.log({model:users})
    res.render('users',{model:users})
})

router.get('/users/:id', async (req, res) => {
    const idValue = req.params.id
    const user = await getDocumentById(idValue, "Users")
    res.render('users',{model:user})
})

router.get('/addUser',(req,res)=>{
    res.render('addUser')
})

router.get('/deleteUser/:id', async (req, res) => {
    const idValue = req.params.id
    await deleteObject(idValue, "Users")
    res.redirect('/admin/users')
})

router.post('/addUser',async (req,res)=>{
    const name = req.body.txtName
    const pass = req.body.txtPass
    const role = req.body.txtRole
    const email = req.body.txtEmail
    const objectToInsert = {
        userName: name,
        password: pass,
        role: role,
        email: email,
    }
    await insertObject("Users", objectToInsert)
    res.redirect('/admin/users')
})

router.post('/addCourse',async (req,res)=>{
    const name = req.body.txtName
    const deadline1 = req.body.txtDL1
    const deadline2 = req.body.txtDL2
    const objectToInsert = {
        courseName: name,
        deadLine1: deadline1,
        deadLine2: deadline2,
    }
    await insertObject("Course", objectToInsert)
    res.redirect('/admin/users')
})

router.post('/update', async (req, res) => {
    const id = req.body.txtOId
    const name = req.body.txtUname
    const pass = req.body.txtPassword
    const role = req.body.txtRole
    const email = req.body.txtEmail
    let updateValues = { $set: {
        userName: name,
        password: pass,
        role: role,
        email: email
    } };
    await updateDocument(id, updateValues, "Users")
    res.redirect('/admin/users')
})

router.get('/editUser/:id', async (req, res) => {
    const idValue = req.params.id
    const userToEdit = await getDocumentById(idValue, "Users")
    res.render("editUser", { user: userToEdit })
})

module.exports = router;
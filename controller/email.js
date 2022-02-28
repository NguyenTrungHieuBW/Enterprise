const express = require('express')
const { insertObject, updateDocument, deleteObject, getDocumentById, getDocument} = require('../model/databaseControl')
const router = express.Router()
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
       host: 'smtp.mailtrap.io',
       port: 2525,
       auth: {
        user: "2e0fee78e82e67",
        pass: "4fc1be255977a3"
       }
})

message = {
    from: "from@email.com",
    to: "to@email.com",
    subject: "Subject",
    html: "<h1>Hello SMTP Email</h1>"
}

module.exports = router;
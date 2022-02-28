var express = require('express')
const {} = require('./model/databaseControl')
var app = express()

var hbs = require('hbs')
app.set('view engine','hbs')

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',async (req,res)=>{
    res.render('home')
})

app.get('/adminIndex', async (req, res) => {
    res.render('adminIndex')
})


const adminController = require('./controller/admin')
app.use('/admin', adminController)

const commentController = require('./controller/comment')
app.use('/comment', commentController)

const ideaController = require('./controller/idea')
app.use('/comment', ideaController)


var PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server is running at " + PORT)
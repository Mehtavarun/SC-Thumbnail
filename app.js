//required modules
const express = require('express'),
jwt = require('jsonwebtoken'),  //package to use json web token
app = express(),
ejs = require('ejs'),
multer = require('multer'), //package to upload file to server
path = require('path'),
jimp = require('jimp');  //package to resize image
bodyParser = require('body-parser');
urlencodedParser = bodyParser.urlencoded({extended:false}),
jsonpatch = require('json-patch'),  //package to apply json-patch
morgan = require('morgan');

//required files for functionality
const authJWT = require('./authJWT')(jwt, app, urlencodedParser, express, path),
	  resizeImage = require('./resizeImage')(jimp, app),
	  uploadImage = require('./uploadImage')(multer, app, path),
	  jp = require('./jsonpatch')(jsonpatch, app, urlencodedParser);

app.use(morgan('dev')); //Logger to log different request and responses

//All other routes other than specified are forbidden
app.get('*',(req, res)=>{
	res.sendStatus(404);
})

//setting engine to use ejs
app.set('view engine', 'ejs');

//setting folder to see for ejs files to render to client
app.use(express.static('./public'));

//port at which server will run
app.listen(6500,
	()=> console.log('Started at 6500 port'));
const express = require('express'),
jwt = require('jsonwebtoken'),
app = express(),
ejs = require('ejs'),
multer = require('multer'),
path = require('path'),
jimp = require('jimp');
bodyParser = require('body-parser');
urlencodedParser = bodyParser.urlencoded({extended:false}),
jsonpatch = require('json-patch'),
morgan = require('morgan');

//required files
const authJWT = require('./authJWT')(jwt, app, urlencodedParser, express, path),
	  resizeImage = require('./resizeImage')(jimp, app),
	  uploadImage = require('./uploadImage')(multer, app, path),
	  jp = require('./jsonpatch')(jsonpatch, app, urlencodedParser);

app.use(morgan('dev'));

app.get('*',(req, res)=>{
	res.sendStatus(404);
})

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.listen(6500,
	()=> console.log('Started at 6500 port'));
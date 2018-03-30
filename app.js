const express = require('express'),
jwt = require('jsonwebtoken'),
app = express(),
ejs = require('ejs'),
multer = require('multer'),
path = require('path'),
jimp = require('jimp');

//required files
const JWT = require('./authJWT')(jwt, app),
	  resizeImage = require('./resizeImage')(jimp, app),
	  uploadImage = require('./uploadImage')(multer, app, path, resizeImage, resizeImage, authJWT);

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.listen(6500,
	()=> console.log('Started at 6500 port'));
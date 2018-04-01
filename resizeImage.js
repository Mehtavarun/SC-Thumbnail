module.exports = (jimp, app)=>{  
	
	app.use(morgan('dev'));	 //using morgan as middleware to log requests

	//url to resize the image uploaded by user
	app.get('/resize', (req, res)=>{

		//reads the image uploaded by the user
		jimp.read('./public/upload/image.jpg').then(( image)=>{

			image.resize(50, 50) //resizing image
			.quality(90)  //quality of image
			.write('./public/editedImage/image50x50.jpg'); //saving new resized image			

		}).catch((err)=>{
			throw err;
		})

		//resized image is sent to client for download
		res.download('./public/editedImage/image50x50.jpg');

	});
}
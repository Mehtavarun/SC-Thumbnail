module.exports = (jimp, app)=>{  
app.use(morgan('dev'));	
	app.get('/resize', (req, res)=>{

		jimp.read('./public/upload/image.jpg').then(( image)=>{

			image.resize(50, 50)
			.quality(90)
			.write('./public/editedImage/image50x50.jpg');			

		}).catch((err)=>{
			throw err;
		})
		res.download('./public/editedImage/image50x50.jpg');

	});
}
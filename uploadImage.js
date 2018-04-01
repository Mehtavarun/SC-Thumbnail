module.exports = (multer, app, path)=>{  
	
	app.use(morgan('dev'));  //using morgan as middleware to log requests

	//set storage engine for uploading
	const storage = multer.diskStorage({
		destination: './public/upload/',
		filename: (req, file, callback)=>{
			callback(null, 'image'+ path.extname(file.originalname));
		}
	});

	//init upload
	const upload = multer({
		
		storage,
		limits: {fileSize: 2000000},  //max size 2mb
		fileFilter: (req, file, callback)=>{
			checkFileType(file, callback);
		}

	}).single('myimage');  //name same from index.ejs field

	function checkFileType(file, callback){
		//allowed ext 
		const filetypes = /jpeg|jpg|gif|png/;
		//check extension
		let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
		//check mime type
		let mimetype = filetypes.test(file.mimetype);

		if(mimetype && extname){
			return callback(null, true);
		} else {        //if other than images then sent error
			return callback('Error: Images only');
		}
	}

	//route to upload the image 
	//recieved by post request from client
	app.post('/api/upload', (req, res)=>{
				
		upload(req, res, (err)=>{

			if(err) {
				res.render('index', {
					msg:err,token:req.query.token
				})
				
				} else {
					//checking if no file is selected
					if(req.file === undefined){
						res.render('index',{
							msg:'Error: no file selected',
							token:req.query.token
						})

					} else{
						//redirected to /resize url where the image is resized using jimp
						res.redirect('/resize');
					}
				}
			})
	});

}
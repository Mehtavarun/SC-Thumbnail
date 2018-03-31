module.exports = (multer, app, path)=>{  

	//set storage engine
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
		const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
		//check mime type
		const mimetype = filetypes.test(file.mimetype);

		if(mimetype && extname){
			return callback(null, true);
		} else {
			return callback('Error: Images only');
		}
	}

	app.post('/api/upload', (req, res)=>{
				
		upload(req, res, (err)=>{

			if(err) {
				res.render('index', {msg:err})
				
				} else {

					if(req.file === undefined){
						res.render('index',{
							msg:'Error: no file selected',
							token:''
						})

					} else{

						res.redirect('/resize');
					}
				}
			})
	});

}
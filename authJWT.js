module.exports = (jwt, app)=>{

	app.post('/api/authUser', verifytoken, (req, res)=>{
		
		jwt.verify(req.token, 'secretkey', (err, authData)=>{
			
			if(err) {
				res.sendStatus(403);
			}else{
				
				res.render('index');
			}
		});
	});


	app.get('/api/login', (req, res)=>{

		const user = {
			username: req.body.username,
			password: req.body.password
		};

		jwt.sign({user}, 'secretkey', (err, token)=>{
			res.json({
				loginSuccess:true,
				token //es6 style of token:token
			})
		});
	});

	//Format of token
	//Authorization : Bearer <access_token>

	function verifytoken(req, res, next){
		
		//get auth header value
		const bearerHeader = req.headers['authorization'];

		//check if bearer is undefined
		if(typeof bearerHeader !== 'undefined'){
			//split at the space
			const bearer = bearerHeader.split(' ');
			//Get token from array 
			const bearerToken = bearer[1];
			//set the token
			req.token = bearerToken;
			next();
		}else{
			//forbidden
			res.sendStatus(403);
		}
	}
}
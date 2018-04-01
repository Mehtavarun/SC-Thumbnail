module.exports = (jwt, app, urlencodedParser, express, path)=>{
	
	app.use(morgan('dev')); //using morgan as middleware to log requests

	// orl    /login 
	app.get('/login', urlencodedParser,(req, res)=>{

		//it is mock login
		//any username and password is accepted
		let user = {
			username: req.body.username || req.query.username,
			password: req.body.password || req.query.password
		};

		if(!user.username){
			user.username = "john";
		} 
		 //  if no username or password is
		 // given then default password and username
		if(!user.password){
			user.password = 'password';
		}

		//username and password signed using key to token
		jwt.sign({user}, 'supersafesecretkey', (err, token)=>{
			
			//	token is sent to client as json which 
			//  can be used further to perform actions
			res.json({
				loginSuccess:true,
				token 
			})
		});
	});

	//initializing to express router for use of middleware
	const apiRoutes = express.Router();

	var tk = null;  //variable to send token to index.js for future request
	//in production mode token will be saved using local storage on client side

	/*
		 middleware to check jwt for every to request
	*/
	apiRoutes.use((req, res, next)=>{
		
		//token can be sent by any means 
		//either by header or by query 
		let token =  req.query.token || req.headers['authorization'];
		
		//if token is recieved
		if(token){

			//verify token with same key
			jwt.verify(token, 'supersafesecretkey', (err, authData)=>{
				
				//if invalid token is sent then send message FORBIDDEN
				if(err) {
					res.sendStatus(403);
				}else{

					tk=token;
					//next gives functionality to route which used this middleware
					next();
				}
			});	

			//if no token is sent then send message FORBIDDEN
		} else {
			res.sendStatus(403);
		}
	});

	//use middleware wherever /api is used
	app.use('/api',apiRoutes);

	// to authorize user token and render the page to upload file
	app.get('/api/authUser', (req, res)=>{
				
		res.render('index', {token:tk});
	});

}
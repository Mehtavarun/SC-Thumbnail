module.exports = (jwt, app, urlencodedParser, express, path)=>{

	app.get('/login', urlencodedParser,(req, res)=>{

		const user = {
			username: req.body.username || req.query.username,
			password: req.body.password || req.query.password
		};

		jwt.sign({user}, 'supersafesecretkey', (err, token)=>{
			res.json({
				loginSuccess:true,
				token //es6 style of token:token
			})
		});
	});

	const apiRoutes = express.Router();
	var tk = null;

	apiRoutes.use((req, res, next)=>{
		
		var token =  req.query.token || req.headers['authorization'];
		
		if(token){

			jwt.verify(token, 'supersafesecretkey', (err, authData)=>{
			
				if(err) {
					res.sendStatus(403);
				}else{

					tk=token;
					next();
				}
			});	

		} else {
			res.sendStatus(403);
		}
	});

	app.use('/api',apiRoutes);

	app.get('/api/authUser', (req, res)=>{
				
		res.render('index', {token:tk});
	});

}
module.exports = (jsonpatch, app, urlencodedParser)=>{ 
	
	app.use(morgan('dev')); //using morgan as middleware to log requests

	//url where client can send 
	//various patches to apply to json data
	app.post('/jsonpatch', urlencodedParser, (req, res)=>{

		//json sent by client
		var bodyjson = req.body;
		//applying json patch from recieved from client
		//json contains patch object to apply patch
		var newDoc = jsonpatch.apply(bodyjson, JSON.parse(bodyjson.patch));
		//after patch is applied to json object then it is sent to response
		res.json(newDoc);

	});
}
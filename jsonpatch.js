module.exports = (jsonpatch, app, urlencodedParser)=>{ 
app.use(morgan('dev'));
	app.post('/jsonpatch', urlencodedParser, (req, res)=>{

		var bodyjson = req.body;
		var newDoc = jsonpatch.apply(bodyjson, JSON.parse(bodyjson.patch));
		res.json(newDoc);

	});
}
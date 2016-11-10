var express = require("express");
var TinEye = require("tineye-api");

var app = express();

var private_key = "6mm60lsCNIB,FwOWjJqA80QZHh9BMwc-ber4u=t^";
var public_key ="LCkn,2K7osVwkX95K4Oy";

var api = new TinEye('https://api.tineye.com/rest/', public_key, private_key);

app.get("/", function(req, res){
	
	res.send('Please enter a parameter like this: /offset=10');
	
});

app.get('/:offset', function(req, res){
	
	var offset = req.params.offset;
	var arr = offset.split('=');
	
	if(arr[0]=='offset'&&!isNaN(Number(arr[1]))&&arr.length==2){
		
		var url = 'https://tineye.com/images/meloncat.jpg';
		var params = {
			'offset': arr[1],
			'limit': 1,
			'sort': 'score',
			'order': 'desc'
		};
		
		api.searchUrl(url, params)
			.then(function(response) {
				console.log(response);
				res.send(response.results.matches[0].backlinks);
			})
			.catch(function(error) {
				console.log(error);
				res.send(error);
			});
		
	}
	
	else{
		res.send("wrong parameter");
	}
	
});

app.listen(process.env.PORT||8080);

//https://services.tineye.com/developers/tineyeapi/sandbox.html

//https://www.npmjs.com/package/tineye-api

//https://services.tineye.com/developers/tineyeapi/
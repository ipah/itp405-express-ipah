require('dotenv').config();
const express = require('express');
const request = require('request');
const app = express();
const twitter = require('./api/twitter');


app.get('/tweets', function(req, resp) {
	

	if(!req.query.q){
		resp.status(422).json({
			error: 'Please specify "q" query string parameter'
		})
		return;
	}
	let q = req.query.q;
	twitter.getToken().then(function(token){
		 twitter.get(`https://api.twitter.com/1.1/search/tweets.json?q=${q}`, token).then(function(tweets){
	    	resp.json(tweets);
	    });
	});
  
  });

const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
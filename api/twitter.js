const request = require('request');
module.exports = {
	getToken: function(){
		const CONSUMER_KEY = process.env.CONSUMER_KEY;
	    const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
	    const credentials =  `${CONSUMER_KEY}:${CONSUMER_SECRET}`;
	    base64Credentials = new Buffer(credentials).toString('base64');
	    return new Promise(function(resolve, reject) {
	      request({
	          url: 'https://api.twitter.com/oauth2/token',
	          method: 'POST',
	          headers: {
	            'Authorization': `Basic ${base64Credentials}`,
	            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	          },
	          body: 'grant_type=client_credentials'
	        }, function(error, response, body) {
	          if (error) {
	            reject(error);
	          } else {
	            resolve(JSON.parse(body).access_token);
	          }
	      });
	    });
	  },
	get: function(url, token){
		return new Promise(function(resolve, reject){
			request({
		    	url: url,
		    	method:'GET',
		    	headers:{
		    		'Authorization': `Bearer ${token}`
		    	},
		    	 
		    	

		    }, function(error, res, body){
		    	if(error){
		    		reject(error)
		    	}
		    	else{
		    		
		    		resolve(JSON.parse(body));
		    	}
		    	
		    })
		})
		
	}
}
const express = require('express');
const knex = require('knex');
const app = express();

//routes
app.get('/genres', function(request, response){
	let connection =  connect();
	//select all from genre
	//pending, resolved (success), rejected
	let promise = connection.select().from('genres');
	//pending
	promise.then(function(genres){
		//success
		response.json(genres)
	}, function(){
		//error
		response.json({
			error: 'Something went wrond when finding genres'
		});
	})
});

app.get('/genres/:id',function(request, response){
	let id = request.params.id;

	let connection =  connect();

	let promise = connection.select().from('genres').where('GenreId', id).first();
	promise.then(function(genres){
		response.json(genres);
	}, function(){
		error:'Something went wrong.'
	})
});

const port = process.env.PORT || 8000; //use heroku's port if available (if launched) or use 8000

app.listen(port, function(){
	console.log(`listening on port ${port}`);
}); 


function connect(){
	let connection =  knex({
		client: 'sqlite3',
		connection:{
			filename: './database.sqlite'
		}
	});//local to this function

	return connection;
}
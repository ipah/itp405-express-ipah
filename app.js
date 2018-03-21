const express = require('express');
const knex = require('knex');

const app = express();

//routes
const Genre  = require('./models/Genre');

app.get('/v2/genres', function(request, response){
	Genre.fetchAll().then(function(genres){
		response.json(genres);
	})
});

app.get('/v2/genres/:id', function(request, response){
	let id = request.params.id;
	let genre = new Genre({GenreId: id});
	genre.fetch().then(function(genre){
		if(!genre){
			response.status(404).json({
				error: `Genre ${id} not found`
			});
		}

		else{
			response.json(genre);
		}
		
	})
})



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

app.get('/api/artists', function(request, response){
	let connection = connect();
	let promise = connection.select().from('artists');
	promise.then(function(artists){
		console.log(artists);
		let newMap = artists.map(obj=>{
				var newObj={};
				newObj["id"] = obj.ArtistId;
				newObj["name"] = obj.Name;
				return newObj;
			})
		response.json(newMap);
	}, function(){
		response.json({
			error: 'Something went wrong when finding artists'
		});
	})
});

app.get('/api/artists/filter=:filter?', function(request, response){
	let connection = connect();
	let filter = request.params.filter;
	let promise = connection.select().from('artists').where('Name', 'like', `%${filter}%`);
	console.log(request.params.filter);
	promise.then(function(artists){
		response.json(artists);
	}, function(){
		response.json({error: 'error'});
	});
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
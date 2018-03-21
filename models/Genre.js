
const knex = require('knex');

let bookshelf = require('bookshelf');
bookshelf = bookshelf(connect());


const Genre  = bookshelf.Model.extend({
	tableName : 'genres',
	idAttribute: 'GenreId'
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

module.exports= Genre;
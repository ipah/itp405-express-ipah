const fs = require('fs');
function doSomethingAsync(){
	// fs.readFile('hello.txt',{encoding: 'utf8'},function(error, contents){
	// 	callbackFunction(contents);
	// });

	//promise states = pending, resolved, rejected
	return new Promise(function(resolve, reject){
		fs.readFile('hello.txt',{encoding: 'utf8'},function(error, contents){
			// callbackFunction(contents);
			if(error){
				reject(error);
			}
			else{
				resolve(contents);

			}
			
		});
	});
}

console.log(1);
// doSomethingAsync(function(contents){
// 	console.log(contents);
// });

//promises
//a function can return a promise: a promise that guarantees a value

//let promise = doSomethingAsync();

doSomethingAsync().then(function(contents){
	//success
	console.log(contents);
},
function(error){
	//error
	console.error(error);
}).then(function(){
	console.log('yayyy');
}, function(){

})
console.log(2);
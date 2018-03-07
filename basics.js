

function hello(name){
	console.log('Hello,'+name);
}

function a(callBackFunction){
	callBackFunction();
}






//hello('Ellah');
a(function(){
	console.log('hi');
});
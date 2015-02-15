$(document).ready(function(){
	
    $("form").submit(function( event ) {
	    writeLoginToLocalstorage();
	});

    function writeLoginToLocalstorage(){
	    console.log("writeLoginToLocalstorage is called")
	    var login = $("input[name = 'login']").val();
	    localStorage.setItem("login",login);
	    var login2 = localStorage.getItem("login");
	    console.log("login2: "+login2);
    }
    
})
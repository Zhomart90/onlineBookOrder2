$(document).ready(function(){
	
	
	$.vegas('slideshow', {
		  backgrounds:[
//		    { src:'public/images/bg1.jpg', fade:5000 },
//		    { src:'public/images/bg2.jpg', fade:5000 },
		    { src:'public/images/bg3.jpg', fade:5000 }
		  ]
	})('overlay');
	
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
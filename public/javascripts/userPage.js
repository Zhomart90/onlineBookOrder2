$(document).ready(function(){
	var $books_by_selected_genre = $("#books_by_selected_genre");
	
	getGenres();
	getUserDataByLogin();
	getUserOrderedBooks();
	
	$('select').change( function() {
		getBooksByGenre();
    });
	
	$('#order_book_button').click(function(){
		orderBook();
	});
	
	function clean$books_by_selected_genre(){
		$books_by_selected_genre.empty();	
	}
	
	function getGenres(){
		console.log("getGenres method is called!");
	    $.get("allGenres.json/", function(data) { 
            $("select").empty();
            $.each(data, function(index, item) {
            	if(index == 0){
                    $("select").append(" <option value='"+ item.id+"' selected>"+ item.name+"</input> <br/> ");
                    $.get("booksByGenre.json/"+item.id, function(data) {
                    	clean$books_by_selected_genre();
            	        $.each(data, function(index, item) {
            	            $("#books_by_selected_genre").append(" <input type='checkbox' value='"+ item.id+"' name='"+item.name+"' >"+ item.name+"</input> <br/>");
            	        });
            	    });
            	}else{
            		$("select").append(" <option value='"+ item.id+"' >"+ item.name+"</input> <br/>");	
            	}
            });
        });
	}
	
	function getBooksByGenre(){
		clean$books_by_selected_genre();
	    var selectedGenreId = $('select').find(":selected").attr("value");
	    console.log("selectedGenreId: "+selectedGenreId)
		$.get("booksByGenre.json/"+selectedGenreId, function(data) {
			$.each(data, function(index, item) {
	            $("#books_by_selected_genre").append(" <input type='checkbox' value='"+ item.id+"' name='"+item.name+"'>"+ item.name+"</input> <br/>");
	        });
	    });
	}
	
	function orderBook(){
		 var selectedBooks = "";
		 var $welcome_text = $("#welcome_text").text();
		 var surname = $welcome_text.split(" ")[3];
		 var name = $welcome_text.split(" ")[4];
	     var surnameName = surname+","+name;
	     console.log("surnamename"+surnameName);
		
	     $(':checkbox:checked').each(function() {
			 console.log(this.value);
			 if (selectedBooks == ""){
				 selectedBooks = selectedBooks+this.value;
			 }else{
				 selectedBooks = selectedBooks+","+this.value;
			 }
		 });
		 console.log("selectedBooks: "+selectedBooks);
		 
		 $.post('orderBook',{selectedBooks:selectedBooks , surnameName: surnameName},function(data){
		     $.each(data, function(index, item) {
		         $('ul').append( "<li id ='"+item.name+"'>"+ item.name+"</li>");
		     });			 
		 },'json')
	}
	
	function getUserDataByLogin(){
		var login = localStorage.getItem("login");
        console.log("login: "+login);
        $.get("user.json/"+login, function(data) {
	        $("#welcome_text").text(" Добро пожаловать "+ data.surname+" "+ data.name);
	    });
	}
	
	function getUserOrderedBooks(){
		console.log("getUserOrderedBooks() called");
		var login = localStorage.getItem("login");
		$.get("userOrderedBooks.json/"+login, function(data) {
			$.each(data, function(index, item) {
	            $("ul").append("<li id ='"+item.id+"'>"+ item.name+"</li>");
	        });
	    });
		
	}
	
});
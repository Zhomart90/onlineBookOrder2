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
            	            $("#books_by_selected_genre").append("<div class='book_checkbox'> <input type='checkbox'  value='"+ item.id+"' name='"+item.name+"' >"+ item.name+"</input> </div>");
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
	            $("#books_by_selected_genre").append("<div class='book_checkbox'> <input type='checkbox'  value='"+ item.id+"' name='"+item.name+"'>"+ item.name+"</input> </div>");
	        });
	    });
	}
	
	function orderBook(){
	    var selectedBooks = "";
		var selectedBooksNames = [];
		var repeatedlyOrderedBooks = [];
		var login = localStorage.getItem("login");
		
	    $(':checkbox:checked').each(function() {
			console.log(this.value);
			selectedBooksNames.push(this.name);
			if (selectedBooks == ""){
				selectedBooks = selectedBooks+this.value;
			}else{
				selectedBooks = selectedBooks+","+this.value;
			}
		});
		 
	    console.log("selectedBooks: "+selectedBooks);
		console.log("selectedBooksNames: "+ selectedBooksNames)
		 
		$( "li" ).each(function( index ) {
			 console.log( index + ": " + $( this ).text() );
			 for (var i = 0; i < selectedBooksNames.length; i++) {
			     if($( this ).text() == selectedBooksNames[i]){
				     repeatedlyOrderedBooks.push(selectedBooksNames[i]);
				 }
			 }    
	    });
		 
		console.log("repeatedlyOrderedBooks: "+repeatedlyOrderedBooks);
		 
		$.post('orderBook',{selectedBooks:selectedBooks , login: login},function(data){
		    $.each(data, function(index, item) {
		        $('ul').append( "<li id ='"+item.name+"'>"+ item.name+"</li>");
		    });			 
		},'json')
	}
	
	function getUserDataByLogin(){
		var login = localStorage.getItem("login");
        console.log("login: "+login);
        $.get("user.json/"+login, function(data) {
	        $("#header p").text( data.surname+" "+ data.name);
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
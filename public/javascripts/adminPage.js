$(document).ready(function(){
	getGenres();
	
	$("button").click(function(){
		addBook();	
	});
	
	
	
	
	function getGenres(){
		console.log("getGenres method is called!");
	    $.get("allGenres.json/", function(data) {
            $("select").empty();
            $.each(data, function(index, item) {
            	if(index == 0){
                    $("select").append(" <option value='"+ item.id+"' selected>"+ item.name+"</input> <br/> ");
            	}else{
            		$("select").append(" <option value='"+ item.id+"' >"+ item.name+"</input> <br/>");	
            	}
        });
    });
	}
	
	function addBook(){
		var bookName = $("input[name = 'book.name']").val();
		var bookAuthor = $("input[name = 'book.author']").val();
		var bookManuYear = $("input[name = 'book.manuyear']").val();
		var bookGenreId = $('select').find(":selected").attr("value");
		var bookDescription = $('textarea').val();
		console.log( bookName +" "+bookAuthor+" bookManuYear: "+bookManuYear+" "+bookGenreId+""+bookDescription);
		
		$.post("book/" + bookName+"/"+bookAuthor+"/"+bookManuYear+"/"+bookGenreId +"/"+bookDescription) ;
		
	}
	
});
$(function() {
    
    var searchBar = $('.search-bar');
    var searchBarFixed = 'search-bar-fixed';

    $("#container-user-info-full-repos").sortable();

    $(window).scroll(function(){
        
        if($(window).scrollTop() <= 1){
            $(searchBar).removeClass(searchBarFixed);
		} else {
            $(searchBar).addClass(searchBarFixed);
        }
        
	});

});
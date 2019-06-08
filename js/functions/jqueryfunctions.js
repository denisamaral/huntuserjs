$(function() {
    
    $("#container-user-info-full-repos").sortable();

    $(window).bind('scroll', function () {
      
      if ($(window).scrollTop() > 50) {
          $('.search-bar').addClass('search-bar-fixed');
      } else {
          $('.search-bar').removeClass('search-bar-fixed');
      }

    });

});
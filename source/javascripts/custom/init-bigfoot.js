(function() {

  $(document).ready(function() {

    // Based on: http://www.ewal.net/2012/09/08/octopress-customizations/
    // Wraps each img element in an anchor as expected by fancybox.
    // $('.entry-content').each(function(i){
    //   var _i = i;
    //   $(this).find('img.fancybox').each(function(){
    //     var img = $(this);
    //     var title = img.attr("title");
    //     var classes = img.attr("class");
    //     img.removeAttr("class");
    //     img.wrap('<a href="'+this.src+'" class="' + classes + '" rel="gallery'+_i+'" />');
    //     if (title != "")
    //     {
    //       img.parent().attr("title", title);
    //     }
    //   });
    // });
    // $('.fancybox').fancybox();
    var bigfoot = $.bigfoot({
      activateOnHover: true,
      deleteOnUnhover: true
    });

  });

})();

$(document).ready(function() {

  // Header Footer Loader
  loader.init({
    css:{ //use only if you did not load the css yourself
      header:false, //set true to load header CSS
      footer:false  //set true to load footer CSS
    },
    environment: "domain", //load resources via specific environment: "development", "staging" or "production".
    catalog: "pan-cl",    //load content: "pan-cl", "higher-ed", "professional", "gale", or "thorndike".
    callback:function(){   
        loader.header().footer();
      }
  });

  //resize header to screen size as well as when orientation is changed.
  $(".dropdown-parent > .collapse").each(function(){
    var collapse = $(this);
    var button = $("[data-target='#" + this.id +"']");
    var offset = button.outerHeight();
    $(collapse).css("max-height", $(window).height()-offset);
    $(window).resize(function(){
      $(collapse).css("max-height", $(window).height()-offset);
    });
  });
  
  // Class".page-anchor" causes animated Scroll To panel 
	//when clicking nav buttons scroll to panel
  $('.page-anchor').click(function (e) {      
    scrollToPanel(this);

    var dropdown = $(this).parents(".collapse.in");
    if(dropdown.length > 0) {
      //close dropdown when one has been clicked
      var button = $('[data-target=#' + $(dropdown).attr("id") + "]");
      dropdown.collapse("toggle");
      button.addClass('collapsed');
    }

    //set focus to the elements scrolled to
    e.preventDefault();
  });

  function scrollToPanel(element){
    var target;
    var height = 0;

    if(element && element.nodeType){
      target = $(element).data().target;
      if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && $(window).width() > 760) {
      	height += $(element).outerHeight();
      } else if($(window).width() <= 760) {
        height += $(element).outerHeight() + $("product-bar-container > button").height();
      }
    }else{
      target = element;
    }

    //smoothly scroll to the panel associated with the button clicked
    $(target).animatescroll({
      padding: $("header").outerHeight() + height,
      easing:'easeInOutQuad',
      onScrollEnd: function(){
        if(history.pushState) {
          history.pushState(null, null, target);
        }
        else {
          location.hash = target;
        }
      }
    });
  }

  // Scroll-Action 
  /* Every time the window is scrolled ... */
  $(window).scroll( function(){
    /* Check the location of each desired element */
    $('.scroll-action').each( function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      /* If the object is completely visible in the window, fade it it */
      if( bottom_of_window > bottom_of_object ){
        $(this).addClass('action');
      }
      if(( bottom_of_window < bottom_of_object ) && $(this).hasClass('action') ){
        $(this).removeClass('action');
      }
    }); 
  });

});
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var ready;
ready = function() {

  $(document).click(function(){
    iframe = $('iframe');
    url = iframe.contents().find('.art').attr('src');
    $('body').css('background-image', 'url(' + url + ')');
    console
  });

}
$(document).ready(ready);
$(document).on('page:load', ready);

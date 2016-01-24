// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var ready;
ready = function() {
  var sec = 0;
  function pad ( val ) { return val > 9 ? val : "0" + val; }
  setInterval( function(){
      $(".status").html(pad(++sec%60));
  }, 1000);
}

$(document).ready(ready);
$(document).on('page:load', ready);

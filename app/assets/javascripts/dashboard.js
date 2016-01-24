// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var ready;
ready = function() {
  var newSong = true;
  var song = null;
  $('.submit').click(function(e){
    e.preventDefault();
    $('.song_list').empty();
    newSong = true;
    var ids = "";
    var input = $('.input').val();
    $.ajax({url:"https://api.spotify.com/v1/search?q="+ input +"&type=track",method:"GET",headers:"",cache: false}).done(function( html ) {
      url = html.tracks['items'][0].preview_url;
      for(var i = 0; i < html.tracks['items'].length; i++ ){
        if(i < 21) {
          song = html.tracks['items'][i]
          var backgroundImage = html.tracks['items'][i].album.images[2].url ;
          console.log(backgroundImage);
          $('.song_list').append("<a class='song'><div class='song_div' id='"+ i +"' ></div></a>");
          $('#' + i).css('background',"url(" + backgroundImage + ")")
        }
      }
      $('.play_div').empty();
      $('.play_div').html("<audio class='player' controls><source class='source' src='"+url+"' type='audio/ogg'></audio>");
      createPlayerListner();
    });
  });
  function createPlayerListner(){
    $('.player').on('play',function(){
      if (newSong === true){
        app.createTransaction();
        newSong = false;
      }
    });
  }

  var app = {
    baseUrl: 'http://berlyn.herokuapp.com/',
    toggleEpoch: function() {
      if (app.activeEpoch) {
        app.endEpoch();
      } else {
        app.beginEpoch();
      }
    },
    endEpoch: function() {
      $.ajax({
        method: "POST",
        headers: {
          'Authorization': "Token token=" + '19d095902f3249b3d7b8552506a2061403c50904'
        },
        url: app.baseUrl + 'epochs/' + app.activeEpoch + '/close',
        dataType: 'json',
        crossDomain: true,
        success: app.deactivateEpoch
      });
    },
    deactivateEpoch: function(data) {
      app.activeEpoch = false;
      app.updateBalance(data.user_balance);
      app.updateEpoch(data.epoch_amount);
    },
    beginEpoch: function() {
      $.ajax({
        method: "POST",
        headers: {
          'Authorization': "Token token=" + '19d095902f3249b3d7b8552506a2061403c50904'
        },
        url: app.baseUrl + 'epochs/new',
        data: {
          'user_facebook_token': '1729676297266645'
        },
        dataType: 'json',
        crossDomain: true,
        success: app.activateEpoch,
        error: function(data, status){
          console.log(data);
          console.log(status);
        }
      });
    },
    activateEpoch: function(data) {
      app.activeEpoch = data.epoch_token;
      app.updateBalance(data.user_balance);
    },
    updateBalance: function(balance) {
      $('#balance').html("<p>" + balance + "</p>");
    },
    updateEpoch: function(epoch_amount) {
      $('#epoch').html(epoch_amount);
    },
    createTransaction: function() {
      $.ajax({
        method: "POST",
        headers: {
          'Authorization': "Token token=" + '19d095902f3249b3d7b8552506a2061403c50904'
        },
        url: app.baseUrl + 'epochs/' + app.activeEpoch + '/transactions/new',
        data: {
          amount: 1276
        },
        dataType: 'json',
        crossDomain: true,
        success: function(data) {
          app.updateBalance(data.user_balance);
          app.updateEpoch(data.epoch_amount);
        }
      })
    }
  }
  $.ajaxSetup({
    method: "POST",
    headers: {
      'Authorization': "Token token=" + '19d095902f3249b3d7b8552506a2061403c50904'
    },
    dataType: 'json',
    crossDomain: true
  });
  app.beginEpoch();
  createPlayerListner();
}
$(document).ready(ready);
$(document).on('page:load', ready);

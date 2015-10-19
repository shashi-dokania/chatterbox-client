// YOUR CODE HERE:
var message = {};
var app = {
  init: function(){

    app.fetch();

    message.username = window.location.search.substr(10);

    message.roomname = "main";  

    $(".username").on('click', app.addFriend);
    $("#send").on('click', function(e) {
      app.handleSubmit();
      e.preventDefault();
    });

  },
  send: function(message){
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch: function(){
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type : 'GET',
      dataType: 'json',
      contentType : 'application/json',
      success : function(response) {
        console.log('chatterbox: Message retrieved');
        _.each(response, function(results){
          _.each(results, function(data){
            app.addMessage(data.text, data.username);
            app.addRoom(data.roomname);
            console.log(results);
          })
        });
      },
      error : function(response) {
        console.log('chatterbox: Failed to retrieve message');
      }
    });
  },
  clearMessages: function(){
    $("#chats").html('');
  },
  addMessage: function(text, username){
    $("#chats").prepend("<div class='chat'>" + "<span class='username'>" + username + "<br></span>" + text + "</div>");
    $("#message").val("");
  },
  addRoom: function(room){
    if(room !== undefined){
      $("#roomSelect").append(
          $('<option></option>').html(room)
      );
    }
  },
  addFriend: function(){

  },
  handleSubmit: function(){
    message.text = $("#message").val();
    app.addMessage($("#message").val(), message.username);
    app.send(message);
  }
};

app.init();



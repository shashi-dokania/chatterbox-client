// YOUR CODE HERE:
var message = {};
var app = {
  init: function(){

    message.roomname = $("#roomSelect option:selected").text();

    $(".username").on('click', app.addFriend);
    app.fetch();
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
      type : 'GET',
      dataType: 'json',
      contentType : 'application/json',
      success : function(data) {
        console.log('chatterbox: Message retrieved');
      },
      error : function(data) {
        console.log('chatterbox: Failed to retrieve message');
      }
    });
  },
  clearMessages: function(){
    $("#chats").html('');
  },
  addMessage: function(message){
    $("#chats").append("<div class='chat'>" + "<span class='username'>" + message.username + "<br></span>" + message + "</div>");
  },
  addRoom: function(room){
    $("#roomSelect").append(
        $('<option></option>').html(room)
    );
  },
  addFriend: function(){

  },
  handleSubmit: function(){
    $(".submit").on('click', function(event) {
      message.text = $("#message").text();
      message.username = window.location.search.substr(10);
      app.addMessage(message.text);
    });
  }
};

app.init();




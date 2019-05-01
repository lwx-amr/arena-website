function getPosts(userID){
  $.ajax({
    url: 'http://127.0.0.1:9093/posts/5',
    type: 'GET',
    dataType: 'jsonp',
    data: {
      format: 'json'
    },
    contentType: 'application/json',
    responseType: 'application/json',
    success: function(data) {
      alert(date[0]);
    },
    error: function() {
      alert('An error has occurred');
    },
  });
}

function submitPost(userID,name){
  console.log("here");
  let post = {elements: []};
  let text = $('#text').val();
  let privacy =$('#privacy').val();
  post.elements.push({
      'text': text,
      'userID': userID,
      'privacy': privacy,
      'name': name
  })
  $.ajax({
      url: "http://127.0.0.1:9093/post",
      data: post,
      type: 'POST',
      dataType: 'jsonp',
      contentType: 'application/json',
      crossDomain: true,
      success: function (result) {
          alert("Done");
      },
      error: function (result) {
          alert("An error has occurred");
      },
  });
  return false;
}

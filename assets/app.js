$('document').ready(function() {

//variable for button array
var topics = ["seinfeld", "hulk", "superman", "spiderman", "wonder woman", "batman", "homer simpson", "david bowie", "spongebob"];

//varible for the number of gifs to be generated on the page
var numOfGifs;

// Function for displaying topic data
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
      var btn = $("<button>");
      btn.addClass("topic");
      btn.attr("data-name", topics[i]);
      btn.text(topics[i]);
      $("#buttons-view").append(btn);
    }
  }

  //event listener for the individual gif buttons to generate new gifs in the DOM
  $('body').on('click', '.topic', function() {
    //clear the heading text
    $('#gifs, #presentation').empty();
    numOfGifs = $('#num-gifs').val();
    var topicName = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicName + "&api_key=TD5DD5FpNQaQM8C35D9FYruO53q1tXwm&limit=" + numOfGifs;
    //call the giphy API for the requested number of gifs
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='img-gif-div'>");
          var rating = results[i].rating;
          var ratingParagraph = $("<p class='rating'>").text("Rating: " + rating);
          var topicImage = $("<img>");
          topicImage.addClass('topic-image img-fluid');

          topicImage.attr({
            "src": results[i].images.fixed_height_small_still.url,
            "data-state": "still",
            "data-still": results[i].images.fixed_height_small_still.url,
            "data-animate": results[i].images.fixed_height_small.url
          });

          gifDiv.append(topicImage);
          gifDiv.append(ratingParagraph);
          $('#gifs').append(gifDiv);
        }
    })
  });

  //event listener for the gifs - check if still or animated
  $('#gifs').on('click', '.topic-image', function() {
    var $img = $(this);
    var imgState = $img.attr("data-state")

    if(imgState === "still") {
        var animatedGifURL = $img.attr('data-animate');
        $img.attr('src', animatedGifURL);
        $img.attr("data-state", "animated");
    } 
    if(imgState === "animated") {
        var stillGifURL = $img.attr('data-still');
        $img.attr('src', stillGifURL);
        $img.attr("data-state", "still");
    }
  });

  //event listener for when a gif button is clicked
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#gif-input").val().trim().toLowerCase();
  
    if(topics.includes(newTopic) === false && newTopic !== "") {
      topics.push(newTopic);
    }
    $('#gif-input').val("").focus();
    renderButtons();
  });

renderButtons();

});
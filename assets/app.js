$('document').ready(function() {

//variable for button array
var topics = ["seinfeld", "hulk", "superman", "spiderman", "wonder woman", "batman", "homer simpson", "david bowie", "spongebob"];

//varible for the number of gifs to be generated on the page
var numOfGifs;

// Function for displaying topic data
function renderButtons() {

    // Deleting the buttons prior to adding new topics
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {
      // Then dynamicaly generating buttons for each topic in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var btn = $("<button>");
      // Adding a class of topic to our button
      btn.addClass("topic");
      // Adding a data-attribute
      btn.attr("data-name", topics[i]);
      // Providing the initial button text
      btn.text(topics[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(btn);
    }
  }

  //event listener for the individual gif buttons
  $('body').on('click', '.topic', function() {

    $('#gifs').empty();

    numOfGifs = $('#num-gifs').val();

    var topicName = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicName + "&api_key=TD5DD5FpNQaQM8C35D9FYruO53q1tXwm&limit=" + numOfGifs;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // console.log(topicName);
        var results = response.data
        // console.log(results);
        //loop through the array results
        for (var i = 0; i < results.length; i++) {
          //create a virtual div for holding the GIF
          var gifDiv = $("<div class='img-gif-div'>");
          //get the rating
          var rating = results[i].rating;
          // create a virtual p for the rating
          var ratingParagraph = $("<p>").text("Rating: " + rating);
          //create a virtual image for the GIF itself
          var topicImage = $("<img>");
          topicImage.addClass('topic-image img-fluid');
          // topicImage.attr("src", results[i].images.fixed_height_small_still.url);
          // topicImage.attr("data-state", "still");
          // topicImage.attr("data-still", results[i].images.fixed_height_small_still.url)
          // topicImage.attr("data-animate", results[i].images.fixed_height_small.url);

          // topicImage.attr({
          topicImage.attr({
            "src": results[i].images.fixed_height_small_still.url,
            "data-state": "still",
            "data-still": results[i].images.fixed_height_small_still.url,
            "data-animate": results[i].images.fixed_height_small.url
          });
          //remake this as a 'single' line of code
          // });

          //append the GIF then the virtual p to the div
          gifDiv.append(topicImage);
          gifDiv.append(ratingParagraph);
          //display the GIF container in the DOM
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

  // This function handles events where one button is clicked
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var newTopic = $("#gif-input").val().trim().toLowerCase();
    
    // The topic from the textbox is then added to our array
    if(topics.includes(newTopic) === false && newTopic !== "") {
      topics.push(newTopic);
    }
    $('#gif-input').val("").focus();
    //render the new button with all the other buttons on the page
    renderButtons();

  });

renderButtons();

});
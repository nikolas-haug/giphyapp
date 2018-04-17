$('document').ready(function() {

//variable for button array
var topics = ["seinfeld", "hulk", "superman", "spiderman"];

// Function for displaying movie data
function renderButtons() {

    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    // $("#buttons-view").empty();

    // $('#movie-poster').hide();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var btn = $("<button>");
      // Adding a class of movie to our button
      btn.addClass("topic");
      // Adding a data-attribute
      btn.attr("data-name", topics[i]);
      // Providing the initial button text
      btn.text(topics[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(btn);
    }
  }

  //function for calling the giphy API
//   function getGifs() {
      
//       $.ajax({
//           url: queryURL,
//           method: "GET"
//       }).then(function(response) {
//           console.log(response);
//           console.log(topicName);
//           var results = response.data
//           console.log(results);
//           //loop through the array results
//           for (var i = 0; i < results.length; i++) {
//             //create a virtual div for holding the GIF
//             var gifDiv = $("<div>");
//             //get the rating
//             // var rating = results[i].rating;
//             //create a virtual p for the rating
//             // var p = $("<p>").text("Rating: " + rating);
//             //create a virtual image for the GIF itself
//             var topicImage = $("<img>");
//             topicImage.attr("src", results[i].images.fixed_height.url);
//             //append the GIF then the virtual p to the div
//             gifDiv.append(topicImage);
//             // gifDiv.append(p);
            
//             //display the GIF container in the DOM
//             $('#gifs').prepend(gifDiv);
//           }
//       })
//   }

  //event listener for the individual gif buttons
  $('body').on('click', '.topic', function() {

    var topicName = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicName + "&api_key=TD5DD5FpNQaQM8C35D9FYruO53q1tXwm&limit=5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(topicName);
        var results = response.data
        console.log(results);
        //loop through the array results
        for (var i = 0; i < results.length; i++) {
          //create a virtual div for holding the GIF
          var gifDiv = $("<div>");
          //get the rating
          // var rating = results[i].rating;
          //create a virtual p for the rating
          // var p = $("<p>").text("Rating: " + rating);
          //create a virtual image for the GIF itself
          var topicImage = $("<img>");
          topicImage.attr("src", results[i].images.fixed_height.url);
          //append the GIF then the virtual p to the div
          gifDiv.append(topicImage);
          // gifDiv.append(p);
          
          //display the GIF container in the DOM
          $('#gifs').prepend(gifDiv);
        }
    })
    

    // getGifs();
  });



renderButtons();


});
$(document).ready(function(){


	var topics = ["Mulan","Tarzan", "The Lion King", "Aladdin", "Sleeping Beauty", "Beauty and the Beast", "The Little Mermaid"]; 	
	var about;


	function renderButtons (){
		for (var i = 0; i < topics.length; i++) {
			var newButton = $("<button>").text(topics[i]);
			newButton.attr("data-name", topics[i]);
			newButton.addClass("select")
			$("#buttonsList").append(newButton);
		};

	};

	function displaySearchInfo(){
		var filmTitle = $(this).attr("data-name");

		var about = getMovieQuery(filmTitle);

		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+about+"&api_key=B2fYI43Qg9B2HN4hQAVX7I5IBNO95NVZ&limit=10"


		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){

			var results = response.data; 	
			for (var i = 0; i < results.length; i++) {
				var topicDiv = $("<div>");
				var rating = $("<p>").html(results[i].rating);
				var topicImage = $("<img>");
				topicImage.addClass("gif");
				topicImage.attr("src", results[i].images.fixed_height_still.url);
				topicImage.attr("data-still", results[i].images.fixed_height_still.url);
				topicImage.attr("data-animate", results[i].images.fixed_height.url);
				topicImage.attr("data-state", "still");
				topicDiv.append(rating);
				topicDiv.append(topicImage);
				$("#collection").prepend(topicDiv);

			}

			

		})

	};	

	function addDisney (){
		event.preventDefault();
		var input = $("#movie-input").val().trim();	
		topics.push(input);
		$("#buttonsList").empty();
		renderButtons();

	};

	$("#add-movie").on("click", addDisney);


	function getMovieQuery(filmTitle){
		var rearrange = filmTitle.split(" ");
		var queryMovie = "";
		for (var i = 0; i < rearrange.length; i++) {
			queryMovie += rearrange[i] + "+";
		};

		var query = queryMovie.slice(0,-1); 

		return query;

	}

	$(document.body).on("click",".gif", function(){
				var state = $(this).attr("data-state");
				var static = $(this).attr("data-still");
				var dynamic = $(this).attr("data-animate");
				console.log($(this).attr("src"));
				if (state === "still") {
					$(this).attr("src", dynamic);
					$(this).attr("data-state", "animate");
				} else {
					$(this).attr("src", static);
					$(this).attr("data-state", "still");
				}


			});

	$(document.body).on("click", ".select", displaySearchInfo);

	renderButtons();



































































	});
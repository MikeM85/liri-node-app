require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var request = require('request');

var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var parameter = process.argv[3];

function switchCase() {
    
    switch (action) {                        
  
      case 'spotify-this-song':
        spotSong(parameter);
        break;

        case 'concert-this':
        bandThing(parameter);
        break;

        case 'movie-this':
        movieThing(parameter);
        break;

        case 'do-what-it-says':
        whatItDo(parameter);
        break;
    }
};

function spotSong(parameter) {

    var searchTrack;
    if (parameter === undefined) {
      searchTrack = "The Sign ace of base";
    } else {
      searchTrack = parameter;
    }
  
    spotify.search({
      type: 'track',
      query: searchTrack
    }, function(error, data) {
      if (error) {
        displayIt('Error occurred: ' + error);
        return;
      } else {
        displayIt("\n---------------------------------------------------\n");
        displayIt("Artist: " + data.tracks.items[0].artists[0].name);
        displayIt("Song: " + data.tracks.items[0].name);
        displayIt("Preview: " + data.tracks.items[3].preview_url);
        displayIt("Album: " + data.tracks.items[0].album.name);
        displayIt("\n---------------------------------------------------\n");
        
      }
    });
  };

  function bandThing(parameter){

    if (action === 'concert-this'){
    
    var queryUrl = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";
    
    request(queryUrl, function(error, response, body) {
    // console.log("loaded!");
      if (!error && response.statusCode === 200) {
    
        var JS = JSON.parse(body);
        // console.log(JS);
        for (i = 0; i < JS.length; i++)
        {
          var dTime = JS[i].datetime;
            var month = dTime.substring(5,7);
            var year = dTime.substring(0,4);
            var day = dTime.substring(8,10);
            var dateForm = month + "/" + day + "/" + year
      
          displayIt("\n---------------------------------------------------\n");
    
            
          displayIt("Date: " + dateForm);
          displayIt("Name: " + JS[i].venue.name);
          displayIt("City: " + JS[i].venue.city);
          if (JS[i].venue.region !== "")
          {
            displayIt("Country: " + JS[i].venue.region);
          }
          displayIt("Country: " + JS[i].venue.country);
          displayIt("\n---------------------------------------------------\n");
        
        }
      }
    });
    }
}

function movieThing(parameter) {


  var findMovie;
  if (parameter === undefined) {
    findMovie = "Dead Man";
  } else {
    findMovie = parameter;
  };

  var queryUrl = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=trilogy";
  
  request(queryUrl, function(err, res, body) {
  	var bodyOf = JSON.parse(body);
    if (!err && res.statusCode === 200) {
      displayIt("\n---------------------------------------------------\n");
      displayIt("Title: " + bodyOf.Title);
      displayIt("Release Year: " + bodyOf.Year);
      displayIt("IMDB Rating: " + bodyOf.imdbRating);
      displayIt("Rotten Tomatoes Rating: " + bodyOf.Ratings[1].Value); 
      displayIt("Country: " + bodyOf.Country);
      displayIt("Language: " + bodyOf.Language);
      displayIt("Plot: " + bodyOf.Plot);
      displayIt("Actors: " + bodyOf.Actors);
      displayIt("\n---------------------------------------------------\n");
    }
  });
};

function whatItDo() {
  fs.readFile('random.txt', "utf8", function(error, data){
  
      if (error) {
          return displayIt(error);
        }
  
    
      var dataArr = data.split(",");
      
      if (dataArr[0] === "spotify-this-song") 
      {
        var songcheck = dataArr[1].trim().slice(1, -1);
        spotSong(songcheck);
      }
    })
  }
    

  function displayIt(dataToLog) {
    
	console.log(dataToLog);

	fs.appendFile('log.txt', dataToLog + '\n', function(err) {
		
		if (err) return console.log('Error logging data to file: ' + err);	
	});
}

switchCase();
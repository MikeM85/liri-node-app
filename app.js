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
        logIt('Error occurred: ' + error);
        return;
      } else {
        logIt("\n---------------------------------------------------\n");
        logIt("Artist: " + data.tracks.items[0].artists[0].name);
        logIt("Song: " + data.tracks.items[0].name);
        logIt("Preview: " + data.tracks.items[3].preview_url);
        logIt("Album: " + data.tracks.items[0].album.name);
        logIt("\n---------------------------------------------------\n");
        
      }
    });
  };

  function bandThing(parameter){

    if (action === 'concert-this'){
    
    var queryUrl = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";
    
    request(queryUrl, function(error, response, body) {
    console.log("loaded!");
      if (!error && response.statusCode === 200) {
    
        var JS = JSON.parse(body);
        console.log(JS);
        for (i = 0; i < JS.length; i++)
        {
          var dTime = JS[i].datetime;
            var month = dTime.substring(5,7);
            var year = dTime.substring(0,4);
            var day = dTime.substring(8,10);
            var dateForm = month + "/" + day + "/" + year
      
          logIt("\n---------------------------------------------------\n");
    
            
          logIt("Date: " + dateForm);
          logIt("Name: " + JS[i].venue.name);
          logIt("City: " + JS[i].venue.city);
          if (JS[i].venue.region !== "")
          {
            logIt("Country: " + JS[i].venue.region);
          }
          logIt("Country: " + JS[i].venue.country);
          logIt("\n---------------------------------------------------\n");
        
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
      logIt("\n---------------------------------------------------\n");
      logIt("Title: " + bodyOf.Title);
      logIt("Release Year: " + bodyOf.Year);
      logIt("IMDB Rating: " + bodyOf.imdbRating);
      logIt("Rotten Tomatoes Rating: " + bodyOf.Ratings[1].Value); 
      logIt("Country: " + bodyOf.Country);
      logIt("Language: " + bodyOf.Language);
      logIt("Plot: " + bodyOf.Plot);
      logIt("Actors: " + bodyOf.Actors);
      logIt("\n---------------------------------------------------\n");
    }
  });
};

  function logIt(dataToLog) {
    
	console.log(dataToLog);

	fs.appendFile('log.txt', dataToLog + '\n', function(err) {
		
		if (err) return console.log('Error logging data to file: ' + err);	
	});
}

switchCase();
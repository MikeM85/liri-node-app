var keys = require("./keys.js");
require("dotenv").config();
var Spotify = require('node-spotify-api');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var parameter = process.argv[3];

function switchCase() {
    
    switch (action) {                        
  
      case 'spotify-this-song':
        spotSong(parameter);
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

  function logIt(dataToLog) {
    
	console.log(dataToLog);

	fs.appendFile('log.txt', dataToLog + '\n', function(err) {
		
		if (err) return console.log('Error logging data to file: ' + err);	
	});
}

switchCase();
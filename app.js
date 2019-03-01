require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv;

switch (action){
   
  
    case "spotify-this-song":
    spotifyThisSong();
    logAction();
    break;
}

// * `spotify-this-song`
function spotifyThisSong (){

    spotify.search({
      type:"track",
      query: value}, function(err, data){
  
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
    // * if no song is provided then your program will default to
    //   * "The Sign" by Ace of Base
    if(value === ""){
        console.log("************");
        console.log("Artist: Ace of Base");
        console.log("Song: The Sign");
        console.log("Song Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
        console.log("Album: The Sign");
        console.log("************");
    }
    else{
  
    for (i = 0; i < 5; i++){
  
        var results = data.tracks.items[i];
  
        var artist = results.artists[0].name;
        var songName = results.name;
        var songLink = results.external_urls.spotify;
        var album = results.album.name;
  
        //Need: artist(s), song's name, preview link of song, album//
        console.log("************");
        console.log("Artist: " + artist);
        console.log("Song: " + songName);
        console.log("Song Link: " + songLink);
        console.log("Album: " + album);
        console.log("************");
      }
  }
  
  });
  
  }
  
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js")
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var commands = process.argv;
var songTitle = "";
var movieTitle = "";

// check commands[2] to determine what was requested.
switch (commands[2]) {
    case `my-tweets`:
        twitter();
        break;

    case `spotify-this-song`:
        getSpotify();
        break;

    case `movie-this`:
        getOMDB();
        break;

    case `do-what-it-says`:
        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }

            // Check data
            // console.log(data);

            // Then split it by commas to make it more readable
            //& shift over to places to match functions.
            commands = data.split(",");
            commands[2] = commands[0];
            commands[3] = commands[1];

            //Use the command selected from the file:
            // console.log(commands);
            switch (commands[2]) {

                case `my-tweets`:
                    twitter();
                    break;

                case `spotify-this-song`:
                    getSpotify();
                    break;

                case `movie-this`:
                    getOMDB();
                    break;

                default:
                    console.log("Request not recognized.  Check random.txt.");
                    instructions();
            }
        });

   
        break;

    default://Commands don't match:
        console.log("Request not recognized.  Try again.");
        instructions();
        
}

function instructions(){
    console.log("Available commands:\n")
    console.log("Twitter:");
    console.log("node liri.js my-tweets\n");
    console.log("Spotify:");
    console.log("node liri.js spotify-this-song  <song name here>\n ");
    console.log("Movies:");
    console.log("node liri.js movie-this <movie name here>\n");
    console.log("Do What It Says:");
    console.log("node liri.js  do-what-it-says");

}

function twitter() {
    client.get('statuses/user_timeline.json?count=20', { q: 'node.js' }, function (error, tweets, response) {
        // console.log((JSON.stringify(tweets,null,2)));
        console.log("My Twitter Feed:");

        for (var i = 0; i < tweets.length; i++) {
            console.log((JSON.stringify(tweets[i].text, null, 2)));
        }
        console.log("-----------------------------------------------------------------------------------------------------------");
    });
}

function getSpotify() {
    if (!commands[3]) {  //No Song Available: Load this one. 
        songTitle = "the sign";
        // console.log(songTitle)
    } else {

        songTitle = commands.slice(3).join(" ");
    }

    //Call -up Spotify & look for song title.
    // console.log(songTitle);
    spotify.search({ type: 'track', query: songTitle, limit: 1 }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        // console.log("command:"+ data);
        // console.log((JSON.stringify(data.tracks.items, null, 2)));
        // console.log((JSON.stringify(data,null,2)));
        // Do something with 'data'
        var k = 0;
        //Display song information:
        for (var j = 0; j < data.tracks.items[0].album.artists.length; j++) {
            var k = j + 1;
            console.log("Artist" + k + ": " + data.tracks.items[0].album.artists[j].name);
        }
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Song URL: " + data.tracks.items[0].preview_url);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log("-----------------------------------------------------------------------------------------------------------");
    });
}

function getOMDB() {
    // Start OBDB
    // Store all of the arguments in an array.
    if (!commands[3]) {
        //No Movie Available: Load this one. 
        movieTitle = "mr nobody";
        console.log(songTitle)
    } else {
        //For multi-word song titles;
        movieTitle = commands.slice(3).join(" ");
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful:
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover the required imdbRating info:

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Cast: " + JSON.parse(body).Actors);
            console.log("-----------------------------------------------------------------------------------------------------------");

        }
    });
}

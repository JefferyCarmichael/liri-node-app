
# LIRI Node APP
LIRI stands for Language Interpretation and Recognition Interface.  LIRI is a command line node app uses specific commands to get  data from Twitter, Spotify and OMDB.

Liri.js can useone of the following commands:
* _`my-tweets`_
* _`spotify-this-song`_
* _`movie-this`_
* _`do-what-it-says`_

##My Tweets

**Uses the following command:**

*node liri.js my-tweets*

This will show your last 20 tweets and when they were created at in the terminal/bash window.


##Spotify

**Spotify uses the following command:**

*node liri.js spotify-this-song '<song name here>'*

This will show the following information about the song in your terminal/bash window:

* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

If no song is chosen, your song choice will default to *The Sign*  by Ace of Base.


#OMDB

**OMDB  uses the following command:**

*node liri.js movie-this '<movie name here>'*

If no movie choise is made, the movie choice will default to _'Mr. Nobody.'_

The following information to your terminal/bash window:

* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.


#Do What It Says

**Do what is says' the following command:**

*node liri.js  do-what-it-says*
This programs runs commands from the text file random.txt.
It is preloaded with "I Want it That Way," as follows the text in random.txt.


#LIRI URL:
https://jefferycarmichael.github.io/liri-node-app/

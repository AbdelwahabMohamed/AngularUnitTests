describe('omdb service', function () {
    //Test data
    var movieData = {
            "Title": "Star Wars: Episode IV - A New Hope",
            "Year": "1977",
            "Rated": "PG",
            "Released": "25 May 1977",
            "Runtime": "121 min",
            "Genre": "Action, Adventure, Fantasy",
            "Director": "George Lucas",
            "Writer": "George Lucas",
            "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
            "Plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.",
            "Language": "English",
            "Country": "USA",
            "Awards": "Won 6 Oscars. Another 50 wins & 28 nominations.",
            "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BYzQ2OTk4N2QtOGQwNy00MmI3LWEwNmEtOTk0OTY3NDk2MGJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
            "Metascore": "92",
            "imdbRating": "8.7",
            "imdbVotes": "963,318",
            "imdbID": "tt0076759",
            "Type": "movie",
            "Response": "True"
        },
        movieDataById = {
            "Title": "Star Wars: Episode IV - A New Hope",
            "Year": "1977",
            "Rated": "PG",
            "Released": "25 May 1977",
            "Runtime": "121 min",
            "Genre": "Action, Adventure, Fantasy",
            "Director": "George Lucas",
            "Writer": "George Lucas",
            "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
            "Plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.",
            "Language": "English",
            "Country": "USA",
            "Awards": "Won 6 Oscars. Another 50 wins & 28 nominations.",
            "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BYzQ2OTk4N2QtOGQwNy00MmI3LWEwNmEtOTk0OTY3NDk2MGJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
            "Metascore": "92",
            "imdbRating": "8.7",
            "imdbVotes": "963,318",
            "imdbID": "tt0076759",
            "Type": "movie",
            "Response": "True"
        },
        omdbApi = {};
    beforeEach(angular.mock.module('omdb'));//adding the mocked module to angular mock
    beforeEach(angular.mock.inject(function (_omdbApi_) { //wrapper around the angular inject service, bootstraps our app and initializes all mocked modules
        omdbApi = _omdbApi_;
    }));

    it('should return search movie data', function () {
        console.log(angular.mock.dump(movieData));        
        expect(omdbApi.search('star wars')).toEqual(movieData);
    }); 

    it('should return movie data by id', function () {
        expect(omdbApi.searchById('tt0076759')).toEqual(movieDataById);
    });
});
/**other ways to use the mock module functionality */
//this way, we can`t send anything else other than the $provide that is being sent implicityly, use for brainstorming
// angular.mock.module({
//     'omdbApi': {
//         search: function (query) {
//             return movieData;
//         }
//     }
// });
//another way to configure the module, also creates an inline implementation, use for brainstorming
// angular.mock.module(function ($provide) {
//     $provide.factory('omdbApi', function () {
//         return {
//             search: function (query) {
//                 return movieData;
//             } 
//         };
//     });
// });
describe('omdb service', function () {
    //Test data
    var movieData = {"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","Rated":"PG","Released":"25 May 1977","Runtime":"121 min","Genre":"Action, Adventure, Fantasy","Director":"George Lucas","Writer":"George Lucas","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing","Plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.","Language":"English","Country":"USA","Awards":"Won 6 Oscars. Another 50 wins & 28 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYzQ2OTk4N2QtOGQwNy00MmI3LWEwNmEtOTk0OTY3NDk2MGJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.7/10"},{"Source":"Rotten Tomatoes","Value":"93%"},{"Source":"Metacritic","Value":"92/100"}],"Metascore":"92","imdbRating":"8.7","imdbVotes":"963,318","imdbID":"tt0076759","Type":"movie","DVD":"21 Sep 2004","BoxOffice":"N/A","Production":"20th Century Fox","Website":"http://www.starwars.com/episode-iv/","Response":"True"},
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
        omdbApi = {},
        $httpBackend;

    //Test setup    
    beforeEach(angular.mock.module('omdb')); //adding the mocked module to angular mock
    beforeEach(angular.mock.inject(function (_omdbApi_, _$httpBackend_) { //wrapper around the angular inject service, bootstraps our app and initializes all mocked modules
        omdbApi = _omdbApi_;
        $httpBackend = _$httpBackend_;
    }));

    //tests
    it('should return search movie data', function () {
        //arrange
        var response;
        var baseUrl = 'http://www.omdbapi.com/?';
        var searchString = 'star wars';
        var url = baseUrl + 't=' + encodeURIComponent(searchString);
        $httpBackend.when('GET', url).respond(200, movieData);
        console.log(url);
        //act
        omdbApi.search(searchString).then(function (data) {
            response = data;
        });
        $httpBackend.flush();//resolve all calls
        
        //assert
        expect(response.data).toEqual(movieData);
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
describe('MovieCore', function () {
    var PopularMovies,
        $httpBackend,
        movie = {
            movieId: 'tt0076759',
            description: 'pla pla pla'
        };
    beforeEach(module('movieCore'));
    beforeEach(inject(function (_PopularMovies_, _$httpBackend_) {
        PopularMovies = _PopularMovies_;
        $httpBackend = _$httpBackend_;
    }));
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create popular movie', function () {
        //arrange
        //'{"movieId":"tt0076759","describtion":"pla pla pla"}'
        var expectedData = function (data) {
            return angular.fromJson(data).movieId === movie.movieId;
        };
        $httpBackend.expectPOST(/./, expectedData).respond(201);

        var popularmovie = new PopularMovies(movie);
        //act
        popularmovie.$save();
        //assert
        expect($httpBackend.flush).not.toThrow();
    });

    it('should get popular movie by id', function () {
        //arrange        
        //'popular/tt0076759'
        $httpBackend.expectGET('popular/tt0076759').respond(200);
        //act
        PopularMovies.get({movieId : 'tt0076759'});
        //assert
        expect($httpBackend.flush).not.toThrow();
    });

    it('should update popular movie', function () {
        //arrange
        //'{"movieId":"tt0076759","describtion":"pla pla pla updated"}'
        var expectedData = function (data) {
            return angular.fromJson(data).describtion === 'pla pla pla updated';
        };
        $httpBackend.expectPUT('popular', expectedData).respond(200);

        var popularMovie = new PopularMovies({
            movieId: movie.movieId,
            describtion: 'pla pla pla updated'
        });

        //act
        popularMovie.$update();

        //assert
        expect($httpBackend.flush).not.toThrow();
    });
   
    it('should set authenticate headers correctly', function () {
        //{"authToken":"x","Accept":"application/json, text/plain, */*"}
        //arrange
        var expectedAuthToken = function (headers) {
            return angular.fromJson(headers).authToken === 'x';
        };
        var matchAny = /.*/;

        $httpBackend.whenGET(matchAny, expectedAuthToken).respond(200); //used when because we are getting twice
        $httpBackend.expectPOST(matchAny, matchAny, expectedAuthToken).respond(200);
        $httpBackend.expectPUT(matchAny, matchAny, expectedAuthToken).respond(200);
        $httpBackend.expectDELETE(matchAny, expectedAuthToken).respond(200);

        //act
        PopularMovies.query();
        PopularMovies.get(movie);
        new PopularMovies(movie).$save();
        new PopularMovies(movie).$update();
        new PopularMovies(movie).$remove();

        //assert
        expect($httpBackend.flush).not.toThrow();
    });
});
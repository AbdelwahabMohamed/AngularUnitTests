describe('Results controller', function () {
    var results = {
        data: {
            "Response": "True",
            "Search": [{
                    "Title": "Star Wars: Episode IV - A New Hope",
                    "Year": "1977",
                    "imdbID": "tt0076759",
                    "Type": "movie"
                },
                {
                    "Title": "Star Wars: Episode V - The Empire Strikes Back",
                    "Year": "1980",
                    "imdbID": "tt0080684",
                    "Type": "movie"
                },
                {
                    "Title": "Star Wars: Episode VI - Return of the Jedi",
                    "Year": "1983",
                    "imdbID": "tt0086190",
                    "Type": "movie"
                }
            ]
        }
    };
    var $controller;
    var $scope;
    var $q;
    var $location;
    var $rootScope;
    var omdbApi;

    beforeEach(module('omdb'));
    beforeEach(module('movieApp'));
    beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$location_, _omdbApi_) {
        $controller = _$controller_;
        $scope = {};
        $q = _$q_;
        $location = _$location_;
        $rootScope = _$rootScope_;
        omdbApi = _omdbApi_;
    }));

    it('should load result search', function () {
        spyOn(omdbApi, 'search').and.callFake(function () {
            var deffered = $q.defer();
            console.log('results in spy is');

            deffered.resolve(results);
            return deffered.promise;
        });
        $location.search('s', 'star wars');
        $controller('ResultsController', {
            $scope: $scope
        });
        $rootScope.$apply();
        expect($scope.results[0].Title).toBe(results.data.Search[0].Title);
        expect($scope.results[1].Title).toBe(results.data.Search[1].Title);
        expect($scope.results[2].Title).toBe(results.data.Search[2].Title);
        expect(omdbApi.search).toHaveBeenCalledWith('star wars');
    });

    it('should return error message', function () {
        spyOn(omdbApi, 'search').and.callFake(function () {
            var deffered = $q.defer();
            deffered.reject();
            return deffered.promise;
        });
        $location.search('s', 'star wars');
        $controller('ResultsController', {
            $scope: $scope
        });
        $rootScope.$apply();
        expect($scope.errorMessage).toBe('something went wrong dumdum');
    });
});
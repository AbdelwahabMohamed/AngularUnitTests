(function () {
    'use strict';
    angular.module('movieApp').controller('ResultsController', function ($scope, $location, omdbApi) {
        var query = $location.search().s;
        omdbApi.search(query).then(function (data) {
            $scope.results = data.Search;
        }).catch(function(){
            $scope.errorMessage = 'something went wrong dumdum';
        });
    });
})();
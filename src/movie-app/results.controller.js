(function () {
    'use strict';
    angular.module('movieApp').controller('ResultsController', function ($scope, $location, omdbApi) {
        var query = $location.search().s;
        omdbApi.search(query).then(function (response) {
            if (response.data.Response==="True") {
                $scope.results = response.data.Search;
            }else{
               alert(response.data.Error); 
            }
        }).catch(function (response) {
            alert(response.data.Error);
            $scope.errorMessage = response.data.Error;
        });
    });
})();
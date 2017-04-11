(function () {
    'use strict';
    angular.module('movieApp').controller('ResultsController', function ($scope, $location, omdbApi) {
        var query = $location.search().s;
        omdbApi.search(query).then(function (response) {            
            if (response.data.Response === 'True') {
                $scope.results = response.data.Search;
            } else {
                $scope.errorMessage = response.data.Error;
                alert(response.data.Error);
            }
        }).catch(function (response) {
            if (response && response.data && response.data.Error) {
                alert(response.data.Error);
                $scope.errorMessage = response.data.Error;
            }else{
                 $scope.errorMessage='something went wrong dumdum';
            }
        });
    }); 
})();  
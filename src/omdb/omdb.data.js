(function () {
    'use strict';
    angular.module('omdb', []);
    angular.module('omdb')
        .factory('omdbApi', function ($http, $q) {
            var service = {};
            var baseUrl = 'http://www.omdbapi.com/?';

            service.search = function (query) {
                var deferred = $q.defer(),
                    uri = baseUrl + 't=' + encodeURIComponent(query);

                $http.get(uri)
                    .then(function (data) {
                        console.log('in success: ' + data);
                        deferred.resolve(data);
                    })
                    .catch(function (error) {
                        console.log('in error');
                    })
                    .then(function (data) {
                        console.log('in finally');
                    });
                return deferred.promise;
            };

            service.searchById = function (id) {
                var deferred = $q.defer(),
                    uri = baseUrl + 'i=' + encodeURIComponent(id);
                    console.log(uri);
                $http.get(uri)
                    .then(function (data) {    
                        console.log('in success: ' + data);                                            
                        deferred.resolve(data);
                    })
                    .catch(function (error) {
                        console.log('in error');
                    })
                    .then(function (data) {
                        console.log('in finally');
                    });
                return deferred.promise;
            };


            return service;
        });
})();
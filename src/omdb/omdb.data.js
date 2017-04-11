(function () {
    'use strict';
    angular.module('omdb', []);
    angular.module('omdb')
        .factory('omdbApi', function ($http, $q) {
            var service = {};
            var baseUrl = 'http://www.omdbapi.com/?';

            function httpPromise(url) {
                var deferred = $q.defer();                
                $http.get(url)
                    .then(function (data) {
                        deferred.resolve(data);
                    })
                    .catch(function (error) {
                       deferred.reject();
                    });
                return deferred.promise;
            }

            service.search = function (query) {
                var uri = baseUrl + 's=' + encodeURIComponent(query);
                return httpPromise(uri);
            };

            service.searchById = function (id) {
                var uri = baseUrl + 'i=' + encodeURIComponent(id);
                return httpPromise(uri);
            };
            return service;
        });
})();
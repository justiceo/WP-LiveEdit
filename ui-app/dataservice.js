angular.module('le')
    .factory('DataService', ['$rootScope', '$http', '$q', '$log', function ($rootScope, $http, $q, $log) {
        var service = {};

        service.noop = function () {
            return "no op";
        }

        service.getAllCategories = function () {
            return $q.resolve([]);
        }

        service.getAllTags = function () {
            return $q.resolve([]);
        }

        service.getPost = function () {
            return $q.resolve({});
        }

        service.updatePost = function (post) {
            return $q.resolve(post);
        }

        service.getPostRevisions = function () {
            return $q.resolve({});
        }

        return service;
    }]);
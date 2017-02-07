/**
 * Created by Justice on 2/7/2017.
 */
angular.module('le')
    .factory('ToolbarService', ['$http', '$log', function($http, $log) {
        var service = {};
        service.noop = function() {
            return "no op";
        }
        return service;
    }]);
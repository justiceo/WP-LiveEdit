/**
 * Created by Justice on 2/7/2017.
 */
angular.module('le')
    .service('ToolbarService', ['$http', '$log', function($http, $log) {

        function noop() {
            console.log("no op");
            return "no op";
        }

    }]);
/**
 * Created by I853985 on 2/6/2017.
 */
angular.module('le', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ui.bootstrap'])
    .controller('ToolbarCtrl', function($scope, $window, $uibModal, $uibTooltip, $mdDialog, ToolbarService) {
        var toolbar = this;
        toolbar.buttons = [];
		toolbar.getButtons = function() {
            return ToolbarService.getButtons();
        }
		console.log("toolbar buttons: ", toolbar.buttons);
        toolbar.$scope = $scope;

        $scope.$on("le-collection-changed", function() {
            console.log("collection changed captured by ctrl");
            toolbar.buttons = ToolbarService.getButtons();
            $scope.safeApply();
        });

        $scope.safeApply = function(fn) {
            var phase = $scope.$root.$$phase;
            if (phase == "$apply" || phase == "$digest") {
                if (fn && (typeof (fn) === "function")) {
                    fn();
                }
            } else {
                $scope.$apply(fn);
            }
        };

        function noop() { console.log("no op"); }

        function cancelHandler() {
            console.log("cancel clicked from toolbar ctrl");
        }

    })
    .component('leToolbar', {
        templateUrl: 'toolbar.html',
        controller: 'ToolbarCtrl'
    })
;

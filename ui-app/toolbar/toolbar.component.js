/**
 * Created by I853985 on 2/6/2017.
 */
angular.module('le')
    .controller('ToolbarCtrl', function ($scope, $window, $uibModal, $uibTooltip, $mdDialog, ToolbarService) {
        var toolbar = this;
        toolbar.buttons = ToolbarService.getButtons();

        $scope.safeApply = function (fn) {
            var phase = $scope.$root.$$phase;
            if (phase == "$apply" || phase == "$digest") {
                if (fn && (typeof (fn) === "function")) {
                    fn();
                }
            } else {
                $scope.$apply(fn);
            }
        };
    })
    .component('leToolbar', {
        templateUrl: 'toolbar/toolbar.html',
        controller: 'ToolbarCtrl',
        controllerAs: '$ctrl',
        bindings: {
            placement: '@'
        }
    })
;

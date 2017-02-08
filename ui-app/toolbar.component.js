/**
 * Created by I853985 on 2/6/2017.
 */
angular.module('le', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ui.bootstrap'])
    .controller('ToolbarCtrl', function($uibModal, $uibTooltip, $mdDialog, ToolbarService) {
        var toolbar = this;       
		toolbar.buttons = ToolbarService.getButtons();
		console.log("toolbar buttons: ", toolbar.buttons);

        function noop() { console.log("no op"); }
    })
    .component('leToolbar', {
        templateUrl: 'toolbar.html',
        controller: 'ToolbarCtrl'
    })
;

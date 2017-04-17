angular.module('le', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ui.bootstrap'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('purple')
		.accentPalette('indigo') 
})
	.controller('AppCtrl', function () {
		
		console.log("AppCtrl: Initializing le app");
		
    });

angular.module('le').component('postSettings', {
    //template: '<p style="color:red">hello revisions </p>',
	templateUrl: 'settings.html',
    // this controller will extend ModalController and can access $ctrl.dismiss and $ctrl.ok
    // see: https://angular-ui.github.io/bootstrap/#!#modal
    controller: function SettingsCtrl($mdDialog, ToolbarService) {
				
		$onInit = function() {			
			var settingsButton = {
					id: 'le_settings',
					title: 'Settings',
					icon: 'icon-settings',
					handler: settingsHandler
				};
			ToolbarService.add(settingsButton);
		}
		
		
        function settingsHandler() {
            $mdDialog.show({
              template: '<post-settings>',
              parent: angular.element(document.body),
              clickOutsideToClose:true,
              openFrom: '#le_toolbar',
              closeTo: '#le_toolbar',
              fullscreen: true // Only for -xs, -sm breakpoints.
            });
        }
      
    }
});

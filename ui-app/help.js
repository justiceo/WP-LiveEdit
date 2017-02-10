
angular.module('le').component('leHelp', {
	templateUrl: 'help.html',
    // this controller will extend ModalController and can access $ctrl.dismiss and $ctrl.ok
    // see: https://angular-ui.github.io/bootstrap/#!#modal
    controller: function HelpCtrl($mdDialog, ToolbarService) {
        var helpButton = {
                id: 'le_help',
                title: 'Help',
                icon: 'icon-question',
				position: 5,
                handler: helpHandler
            };
		ToolbarService.add(helpButton);
		
		
        function helpHandler() {
            // open the modal 
            $mdDialog.show({
              template: '<le-help>',
              parent: angular.element(document.body),
              clickOutsideToClose:true,
              openFrom: '#le_toolbar',
              closeTo: '#le_toolbar',
              fullscreen: true // Only for -xs, -sm breakpoints.
            });
        }
    }
});
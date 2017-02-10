
angular.module('le')
    .component('leHelp', {
        templateUrl: 'help/help.html',
        controller: 'HelpCtrl'
    })
    .controller('HelpCtrl', function ($mdDialog, ToolbarService) {
        var ctrl = this;
        var helpButton = {
                id: 'le_help',
                title: 'Help',
                icon: 'icon-question',
				position: 5,
                handler: helpHandler
            };
		ToolbarService.add(helpButton);

        console.log(ctrl);
		
		var text = "hello again";
        ctrl.text = "again and again";

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

        ctrl.cancel = function() {
            console.log("HelpCtrl: cancel click");
            dismiss();
        }
    });

angular.module('le')
    .component('leHelp', {
        template: 'help/help.html',
        controller: 'HelpCtrl'
    })
    .controller('HelpCtrl', function ($scope, $mdDialog, ToolbarService) {
        console.log("HelpCtrl: Initializing...")
        var ctrl = this;
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
                templateUrl: 'help/help.html',
                scope: $scope,        // use parent scope in template
                preserveScope: true,  // do not forget this if use parent scope
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                openFrom: '#le_toolbar',
                closeTo: '#le_toolbar',
                fullscreen: true // Only for -xs, -sm breakpoints.
            });
        }

        $scope.cancel = function () {
            console.log("HelpCtrl: cancel click");
            $mdDialog.hide();
        }

    });

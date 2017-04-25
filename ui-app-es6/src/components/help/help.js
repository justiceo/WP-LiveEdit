import angular from 'angular';

class HelpCtrl {
    constructor ($scope, $mdDialog, ToolbarService) {
        console.log("HelpCtrl: Initializing...")
        this.$mdDialog = $mdDialog;
        this.$scope = $scope;
        let helpButton = {
            id: 'le_help',
            title: 'Help',
            icon: 'icon-question',
            position: 5,
            handler: this.helpHandler
        };
        ToolbarService.add(helpButton);
    }

        helpHandler() {
            // open the modal 
            this.$mdDialog.show({
                templateUrl: 'help/help.html',
                scope: this.$scope,        // use parent scope in template
                preserveScope: true,  // do not forget this if use parent scope
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                openFrom: '#le_toolbar',
                closeTo: '#le_toolbar',
                fullscreen: true // Only for -xs, -sm breakpoints.
            });
        }

        cancel () {
            console.log("HelpCtrl: cancel click");
            this.$mdDialog.hide();
        }
}

const Help = {
    templateUrl: 'components/help/help.html',
    controller: HelpCtrl
}
export default Help

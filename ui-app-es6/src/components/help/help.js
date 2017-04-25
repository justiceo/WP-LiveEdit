import angular from 'angular';

class HelpCtrl {
    constructor ($mdDialog, ToolbarService) {
        console.log("HelpCtrl: Initializing...")
        this.$mdDialog = $mdDialog;
        let helpButton = {
            id: 'le_help',
            title: 'Help',
            icon: 'icon-question',
            position: 5,
            handler: () => this.helpHandler()
        };
        ToolbarService.add(helpButton);
    }

        helpHandler() {
            // open the modal 
            console.log("help: ", this, this.$mdDialog);
            this.$mdDialog.show({
                templateUrl: 'components/help/help.html',
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

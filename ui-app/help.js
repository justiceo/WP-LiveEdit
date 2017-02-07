
angular.module('le').component('leHelp', {
    //template: '<p style="color:red">hello revisions </p>',
	templateUrl: 'help.html',
    // this controller will extend ModalController and can access $ctrl.dismiss and $ctrl.ok
    // see: https://angular-ui.github.io/bootstrap/#!#modal
    controller: function HelpCtrl() {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            // fired by modal instance
        };
    }
});
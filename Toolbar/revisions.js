/**
 * Created by I853985 on 2/6/2017.
 */

angular.module('le').component('postRevisions', {
    //template: '<p style="color:red">hello revisions </p>',
	templateUrl: 'revisions.html',
    // this controller will extend ModalController and can access $ctrl.dismiss and $ctrl.ok
    // see: https://angular-ui.github.io/bootstrap/#!#modal
    controller: function RevisionsCtrl() {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            // fired by modal instance
        };
    }
});
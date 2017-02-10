/**
 * Created by I853985 on 2/6/2017.
 */
angular.module('le').component('postRevisions', {
    templateUrl: 'revisions/revisions.html',
    // this controller will extend ModalController and can access $ctrl.dismiss and $ctrl.ok
    // see: https://angular-ui.github.io/bootstrap/#!#modal
    controller: function RevisionsCtrl($mdDialog, ToolbarService, DataService) {


        var revisionsButton = {
            id: 'le_revisions',
            title: 'Revisions',
            icon: 'icon-clock',
            disabled: false,
            position: 3,
            handler: revisionsHandler
        };
        ToolbarService.add(revisionsButton);

        var actionButtons = [
            {
                id: 'le_revisions_save',
                title: 'Save',
                icon: 'icon-check',
                handler: cancelHandler
            },
            {
                id: 'le_revisions_publish',
                title: 'Publish',
                icon: 'icon-cursor',
                handler: cancelHandler
            },
            {
                id: 'le_revisions_cancel',
                title: 'Cancel',
                icon: 'icon-close',
                handler: cancelHandler
            }
        ]

        function revisionsHandler() {
            // selecting a revision only drops it's contents in the dom (doesn't persist) - so it's basically a "preview"
            // user should choose to "save" the preview as the post or cancel to return to original

            $mdDialog.show({
                template: '<post-revisions>',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                openFrom: '#le_toolbar',
                closeTo: '#le_toolbar',
                fullscreen: true // Only for -xs, -sm breakpoints.
            });
            var rev_buttons = ["le_revisions", "le_save", "le_publish", "le_cancel"];
            var length = ToolbarService.getButtons().length;
            actionButtons.forEach(function (b) {
                b.position = ++length;
                ToolbarService.add(b);
            });
            revisionsButton.disable = true;
            loadPostRevisions();
        }

        function cancelHandler() {
            revisionsButton.disable = false;
            actionButtons.forEach(function (b) {
                ToolbarService.remove(b);
            });
        }

        var revisions = [];

        function loadPostRevisions() {
            DataService.getPostRevisions().then(
                function (revisions) {
                    console.log("revisions: ", revisions);
                    revisions = revisions;
                },
                function (error) {
                    console.log("RevisionsCtrl: Error loading revisions", error);
                }
            );
        }
    }
});
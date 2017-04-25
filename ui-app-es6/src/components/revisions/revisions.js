/**
 * Created by I853985 on 2/6/2017.
 */
import angular from 'angular';

class RevisionsCtrl {
    constructor($mdDialog, ToolbarService, DataService) {
        this.$mdDialog = $mdDialog;

        this.revisionsButton = {
            id: 'le_revisions',
            title: 'Revisions',
            icon: 'icon-clock',
            disabled: false,
            position: 3,
            handler: () => this.revisionsHandler()
        };
        ToolbarService.add(this.revisionsButton);
        this.revisions = []
        this.DataService = DataService;
    }

    revisionsHandler() {
            // selecting a revision only drops it's contents in the dom (doesn't persist) - so it's basically a "preview"
            // user should choose to "save" the preview as the post or cancel to return to original

            this.$mdDialog.show({
                templateUrl: 'components/revisions/revisions.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                openFrom: '#le_toolbar',
                closeTo: '#le_toolbar',
                fullscreen: true // Only for -xs, -sm breakpoints.
            });

            this.revisionsButton.disable = true;
            this.loadPostRevisions();
        }
        

        loadPostRevisions() {
            this.DataService.getPostRevisions().then(
                function (revisions) {
                    console.log("revisions: ", revisions);
                    revisions = this.revisions;
                },
                function (error) {
                    console.log("RevisionsCtrl: Error loading revisions", error);
                }
            );
        }

}
const PostRevisions = {
    template: require('./revisions.html'),
    controller: RevisionsCtrl
}
export default PostRevisions;
import angular from 'angular';

class NewPostCtrl {
    constructor($scope, $mdDialog, ToolbarService) {
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.ToolbarService = ToolbarService;
        let button = {
            id: 'le_new_post',
            title: 'New Post',
            icon: 'icon-pencil',
            position: 2,
            handler: this.newPostHandler
        };
        ToolbarService.add(button);
        console.log("initializing new post")
    }

        newPostHandler() {
            this.$mdDialog.show({
                templateUrl: 'new-post/new-post.html',
                scope: this.$scope,
                preserveScope: true,
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                openFrom: '#le_toolbar',
                closeTo: '#le_toolbar',
                fullscreen: true // Only for -xs, -sm breakpoints.
            });
        }

    cancel() {
            this.$mdDialog.hide();
        }

        create (title) {
            console.log("EDITOR: creating post title");
            if(!title) return;

        }
    }
    
const NewPost = {
    controller: NewPostCtrl,
    templateUrl: 'components/new-post/new-post.html'
}
export default NewPost;
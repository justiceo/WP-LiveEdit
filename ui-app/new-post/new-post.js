angular.module('le').component('newPost', {
    templateUrl: 'new-post/new-post.html',
    controller: function NewPostCtrl($scope, $mdDialog, ToolbarService) {
        var button = {
            id: 'le_new_post',
            title: 'New Post',
            icon: 'icon-pencil',
            position: 2,
            handler: newPostHandler
        };
        ToolbarService.add(button);
        console.log("initializing new post")

        function newPostHandler() {
            $mdDialog.show({
                templateUrl: 'new-post/new-post.html',
                scope: $scope,
                preserveScope: true,
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                openFrom: '#le_toolbar',
                closeTo: '#le_toolbar',
                fullscreen: true // Only for -xs, -sm breakpoints.
            });
        }

        $scope.cancel = function () {
            $mdDialog.hide();
        }

        $scope.create = function(title) {
            console.log("EDITOR: creating post title");
            if(!title) return;

        }
    }
});

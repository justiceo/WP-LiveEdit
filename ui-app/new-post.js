
angular.module('le').component('newPost', {
    //template: '<p style="color:red">hello revisions </p>',
	templateUrl: 'new-post.html',
    controller: function NewPostCtrl($mdDialog, ToolbarService) {
        var button = {
            id: 'le_new_post',
            title: 'New Post',
            icon: 'icon-pencil',
			position: 2,
            handler: newPostHandler
        };
        ToolbarService.add(button);
		
		
        function newPostHandler() {
            $mdDialog.show({
              template: '<new-post>',
              parent: angular.element(document.body),
              clickOutsideToClose:true,
              openFrom: '#le_toolbar',
              closeTo: '#le_toolbar',
              fullscreen: true // Only for -xs, -sm breakpoints.
            });
        }
      
    }
});


angular.module('le')
	.component('editor', {
		template: 'hello world',
		controller: 'EditorCtrl'
	})
.controller('EditorCtrl', function($scope, $mdDialog, ToolbarService) {
        var button = {
                id: 'le_edit',
                title: 'Edit',
                icon: 'icon-note',
				position: 1,
                handler: editHandler,
            };
		ToolbarService.add(button);
		
		var actionButtons = [
				{
					id: 'le_save',
					title: 'Save',
					icon: 'icon-check',
					handler: saveHandler
				},
				{
					id: 'le_publish',
					title: 'Publish',
					icon: 'icon-cursor',
					handler: publishHandler
				},
				{
					id: 'le_cancel',
					title: 'Cancel',
					icon: 'icon-close',
					handler: cancelHandler
				}
			]
		
		function editHandler() {
			console.log("editor init clicked");
            // enable edit mode
            // todo: medium editor here
			var length = ToolbarService.getButtons().length;
			actionButtons.forEach(function(b) {
				b.position = ++length;
				ToolbarService.add(b);
			});
			button.disable = true;
        }
		
		function saveHandler() {
			console.log("editor save clicked");
		}
		
		function publishHandler() {
			
		}
				
		function cancelHandler() {
			console.log("editor cancel clicked");
			button.disable = false;
			actionButtons.forEach(function(b) {
				ToolbarService.remove(b);
			});
		}
});
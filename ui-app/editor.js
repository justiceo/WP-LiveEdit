
angular.module('le')
	.component('editor', {
		template: 'hello world',
		controller: 'EditorCtrl'
	})
.controller('EditorCtrl', function($mdDialog, ToolbarService) {
        var button = {
                id: 'le_edit',
                title: 'Edit',
                icon: 'icon-note',
                handler: editHandler
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
            // enable edit mode
            // todo: medium editor here
			actionButtons.forEach(function(b) {
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
			button.disable = false;
			actionButtons.forEach(function(b) {
				ToolbarService.remove(b.id);
			});
		}
});
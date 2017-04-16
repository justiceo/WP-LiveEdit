
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
			];
		
		// initialize editor variables for post content
		var contentClass = ".post-content";
		var autolist = new AutoList(); // for autolist plugin
		var contentEditorOptions = {
			buttonLabels: 'fontawesome',
			placeholder: {
				text: 'Write your story here',
				hideOnClick: false
			},
			extensions: {
				'autolist': autolist
			},
			toolbar: {
				buttons: ['h1', 'h2', 'bold', 'italic', 'quote', 'pre', 'unorderedlist','orderedlist', 'justifyLeft', 'justifyCenter', 'anchor']
			}

		};
		var contentEditor = new MediumEditor(contentClass,contentEditorOptions);
		jQuery(contentClass).mediumInsert({
            editor: contentEditor
        });

		// initialize variables for post title
		var titleClass = "h2.entry-title";
		var titleEditorOptions = {
			disableReturn: true,
			disableExtraSpaces: true,
			toolbar: false,
			placeholder: {
				text: 'Enter post title',
				hideOnClick: false
			}
		};
		var titleEditor = new MediumEditor(titleClass, titleEditorOptions);

		function editHandler() {
			console.log(contentEditor);
			var length = ToolbarService.getButtons().length;
			actionButtons.forEach(function(b) {
				b.position = ++length;
				ToolbarService.add(b);
			});
			ToolbarService.remove(button);
			contentEditor.setup();
			titleEditor.setup();
        }
		
		function saveHandler() {
			console.log("editor save clicked");
		}
		
		function publishHandler() {
			
		}
				
		function cancelHandler() {
			actionButtons.forEach(function(b) {
				ToolbarService.remove(b);
			});
			contentEditor.destroy();
			titleEditor.destroy();
			ToolbarService.add(button);
		}
});
/**
 * Created by I853985 on 2/6/2017.
 */

angular.module('le').component('postRevisions', {
    //template: '<p style="color:red">hello revisions </p>',
	templateUrl: 'revisions.html',
    // this controller will extend ModalController and can access $ctrl.dismiss and $ctrl.ok
    // see: https://angular-ui.github.io/bootstrap/#!#modal
    controller: function RevisionsCtrl($mdDialog, ToolbarService) {
        
		
		var revisionsButton = {
                id: 'le_revisions',
                title: 'Revisions',
                icon: 'icon-clock',
				disabled: false,
                handler: revisionsHandler
            };
		ToolbarService.add(revisionsButton);
		
		var actionButtons = [
				{
					id: 'le_save',
					title: 'Save',
					icon: 'icon-check',
					handler: noop
				},
				{
					id: 'le_publish',
					title: 'Publish',
					icon: 'icon-cursor',
					handler: noop
				},
				{
					id: 'le_cancel',
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
              clickOutsideToClose:true,
              openFrom: '#le_toolbar',
              closeTo: '#le_toolbar',
              fullscreen: true // Only for -xs, -sm breakpoints.
            });
            var rev_buttons = ["le_revisions", "le_save", "le_publish", "le_cancel"];
			actionButtons.forEach(function(b) {
				ToolbarService.add(b);
			});
			revisionsButton.disable = true;
        }
		
		function closeHandler() {
			revisionsButton.disable = false;
			actionButtons.forEach(function(b) {
				ToolbarService.remove(b.id);
			});
		}
    }
});
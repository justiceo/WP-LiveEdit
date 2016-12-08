/**
History Plugin
===============
Makes it possible for authors to rollback posts in time, or to see who have modified their posts.
Basic requirements
- Get & display revisions, server returns all revisions item for this post id, displaying date, description of changes and who made the change.
- See if you can use wp-native revisions to achieve this since the feature is already present in wp.
- Recover post, takes the current and puts in revision and takes this older post from revisions and puts it back to the main on.
- Delete revision, simply removes the entry from the revisions db, super simple I suppose.
- Server requests can be mocked
*/
(function($)
{   
    'use strict';
	$.Redactor.prototype.history = function()
	{
		return {			
			langs: {
				en: {
					"history": "History",
					"clear-history": "Clear History"
				}
			},
			init: function()
			{
				var button = this.button.add('history', 'History', this.lang.get('history'));
                this.button.setIcon(button, '<i class="fa fa-clock-o"></i>');
				this.button.addCallback(button, this.history.show);
				console.log("history is good");
			},
			show: function()
			{
				this.modal.addTemplate('history', this.history.getTemplate());
				this.modal.load('history', this.lang.get('history'), 700);	
				this.modal.getActionButton().text(this.lang.get('clear-history')).on('click', this.history.clearHistory);			
				this.modal.show();
				
			},
			getTemplate: function()
			{
				// this should show a list of posts fetched from the server (or mock location), with a "recover" button beside
				return String()
				+ '<div class="modal-section" id="redactor-modal-history">'
					+ '<section>'						
						+ '<p>Makes it possible for authors to rollback posts in time, or to see who have modified their posts. </p>'
					+ '</section>'
					+ '<section>'
						+ '<button id="redactor-modal-button-action" class="danger">Clear History</button>'						
						+ '<button id="redactor-modal-button-cancel">Close</button>'
					+ '</section>'
				+ '</div>';
			},
			clearHistory: function() {
				// do some wp api clean up here
				console.log("history cleared");
			}
		};
	};
})(jQuery);
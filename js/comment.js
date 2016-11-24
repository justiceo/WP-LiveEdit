(function($)
{   
    'use strict';
	$.Redactor.prototype.comment = function()
	{
		return {			
			langs: {
				en: {
					"comment": "Comment",
					"modal-label": "Enter your comments below"
				}
			},
			init: function()
			{
				var button = this.button.add('comment', 'Comment', this.lang.get('comment'));
				
				// initialize add new button
				this.button.addCallback(button, this.comment.show);
			},
			insert: function()
			{	
				this.inline.format('com', 'title', $('#insert-comment-area').val());				
				this.modal.close();
				this.selection.remove();
			},
			show: function()
			{
				// if the parent is already comment, we uncomment it and return
				if(this.selection.parent().tagName == "COM"){
					// select the entire parent
					this.selection.node(this.selection.parent());
					this.inline.format('com', 'title', $('#insert-comment-area').val(), 'remove');				
					this.selection.remove();
					return;
				}
				
				// check if there is actually a real selection
				if(!this.selection.is() || !this.selection.isRedactor()) return; // no selection
					
				// otherwise we add new comment
				this.modal.addTemplate('comment', this.comment.getTemplate());
				this.modal.load('comment', this.lang.get('comment'), 400);

				// action button
				this.modal.getActionButton().text(this.lang.get('insert')).on('click', this.comment.insert);
				this.modal.show();

				// focus
				if (this.detect.isDesktop())
				{
					setTimeout(function()
					{
						$('#insert-comment-area').focus();

					}, 1);
				}
			},
			getTemplate: function()
			{
				return String()
				+ '<div class="modal-section" id="redactor-modal-comment-insert">'
					+ '<section>'						
						+ '<textarea id="insert-comment-area" style="height: 160px;" placeholder="' + this.lang.get('modal-label') + '"></textarea>'
					+ '</section>'
					+ '<section>'
						+ '<button id="redactor-modal-button-action">Insert</button>'
						+ '<button id="redactor-modal-button-cancel">Cancel</button>'
					+ '</section>'
				+ '</div>';
			}
		};
	};
})(jQuery);
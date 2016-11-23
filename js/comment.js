(function($)
{
	$.Redactor.prototype.comment = function()
	{
		return {			
			langs: {
				en: {
					"comment": "Comment",
					"modal-label": "Enter your comments below"
				}
			},
			comments: [],
			init: function()
			{
				var button = this.button.add('comment', 'Comment', this.lang.get('comment'));
				// load all the comments on the page first.
				this.comments = [];
				
				// initialize add new button
				this.button.addCallback(button, this.comment.show);
			},
			insert: function()
			{
				console.log("hello world" + this.selection.get());
				
				var comment_id = this.comments.length;
				var selection = this.comment.selection;
				if(selection.length == 0) return;
				var marked_selection = '<com for="' + comment_id + '">' + selection + '</com>';
				this.comments.push(comment_id);
				this.selection.replace(marked_selection);
				
				this.modal.close();
				this.placeholder.hide();
				
				// display modal for editor to enter comments.
			},
			show: function()
			{
				this.comment.selection = this.selection.get();
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
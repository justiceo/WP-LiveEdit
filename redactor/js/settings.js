/**
Settings Plugin
===============
Provides the options to manage a post's meta-data. Essentially anything we do not want to cloud the editing interface.
Features:
- Delete button: deletes posts and redirects user to home.
- Post slug: updates the post slug
- Featured image: updates post featured image.
- Post status changes. Saving post doesn't change its status.
- Post categories and tags.
*/
(function($)
{   
    'use strict';
	$.Redactor.prototype.settings = function()
	{
		return {			
			langs: {
				en: {
					"settings": "Settings",
					"update": "Update"
				}
			},
			init: function()
			{
				var button = this.button.add('settings', 'Settings', this.lang.get('settings'));
                this.button.setIcon(button, '<i class="fa fa-sliders"></i>');
				this.button.addCallback(button, this.settings.show);
				console.log("settings is good");
			},
			show: function()
			{
				this.modal.addTemplate('settings', this.settings.getTemplate());
				this.modal.load('settings', this.lang.get('settings'), 700);

				// action button
				this.modal.getActionButton().text(this.lang.get('update')).on('click', this.settings.updatePostOptions);				
				this.modal.show();
				
			},
			getTemplate: function()
			{
				return String()
				+ '<div class="modal-section" id="redactor-modal-settings">'
					+ '<section>'						
						+ '<p>Provides the options to manage a post\'s meta-data. Essentially anything we do not want to cloud the editing interface. </p>'
					+ '</section>'
					+ '<section>'
						+ '<button id="redactor-modal-button-action">Insert</button>'
						+ '<button id="redactor-modal-button-cancel">Cancel</button>'
					+ '</section>'
				+ '</div>';
			},
			updatePostOptions: function() 
			{
				console.log("update post settings");
			}
		};
	};
})(jQuery);
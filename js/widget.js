/**
Widget Plugin
===============
Inserts arbitrary wordpress widgets into posts. This include, subscribe forms, related posts, ads etc.
Base requirements / idea:
- Displays a dropdown of available widgets, clicking on one inserts it.
- Widgets are block elements and only their shortcode is inserted into the page.
- Clicking on a widget allows user to style it, like clicking on an image. For example, aligning left / right.
- Widget contents are not editable, even though inside radactor.
- On initial insertion, only a shortcode is available, but after save, the shortcode would be replaced with the html
	- however, we still want to persist the shortcode not the returned html, 
	- so widget wrappers should contain enough information that would allow us to replace rendered html with shortcode before save and get same results
- So this plugin should hook onto the save event of posts and replace html with shortcodes.

*/
(function($)
{   
    'use strict';
	$.Redactor.prototype.widget = function()
	{
		return {			
			langs: {
				en: {
					"widget": "Widget"
				}
			},
			init: function()
			{
				var button = this.button.add('widget', 'Widgets', this.lang.get('widget'));
				this.button.addCallback(button, this.widget.show);
				console.log("widget is good");
			},
			show: function()
			{
				this.modal.addTemplate('widget', this.widget.getTemplate());
				this.modal.load('widget', this.lang.get('widget'), 700);

				// action button
				this.modal.getActionButton().text(this.lang.get('update')).on('click', this.widget.updatePostOptions);				
				this.modal.show();
				
			},
			getTemplate: function()
			{
				return String()
				+ '<div class="modal-section" id="redactor-modal-widgets">'
					+ '<section>'						
						+ '<p>Inserts arbitrary wordpress widgets into posts. This include, subscribe forms, related posts, ads etc. </p>'
					+ '</section>'
					+ '<section>'
						+ '<button id="redactor-modal-button-action">Insert</button>'
						+ '<button id="redactor-modal-button-cancel">Cancel</button>'
					+ '</section>'
				+ '</div>';
			},
			updatePostOptions: function() 
			{
				console.log("update post widget");
			}
		};
	};
})(jQuery);
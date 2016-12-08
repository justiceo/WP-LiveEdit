/**
Quality Plugin
==============
Ensures posts meets some quality standard and SEO stuff. 
Features;
- words counter
- image to text ratio
- image quality detector
- image titles and alt attribute
- excerpt
- categories and tags
- spell checker
- readability scale
*/

(function ($)
{   
    'use strict';
	$.Redactor.prototype.quality = function()
	{
		return {			
			langs: {
				en: {
					"quality": "Quality",
					"quality-modal-label": "Quality Checks"
				}
			},
			init: function()
			{
				var button = this.button.add('quality', 'Post Quality');
                this.button.setIcon(button, '<i class="fa fa-flag-checkered"></i>');
				// initialize add new button
				this.button.addCallback(button, this.quality.show);
			},
			show: function()
			{
				this.modal.addTemplate('quality', this.quality.getTemplate());
				this.modal.load('quality', this.lang.get('quality-\modal-label'), 700);
                
                // build modal content here

				// action button
				this.modal.show();				
			},
			getTemplate: function()
			{
				return String()
				+ '<div class="modal-section" id="redactor-modal-quality">'
					+ '<section>'						
						+ '<p>Ensures posts meets some quality standard and SEO stuff. </p>'
					+ '</section>'
					+ '<section>'						
						+ '<button id="redactor-modal-button-cancel">Close</button>'
					+ '</section>'
				+ '</div>';
			}
		};
	};
})(jQuery);
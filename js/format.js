// UnderLine format
(function($)
{
    $.Redactor.prototype.underline = function()
    {
        return {
            init: function()
            {
                console.log("underline is good");
                var button = this.button.addAfter('italic', 'underline', 'U');
                this.button.addCallback(button, this.underline.format);
            },
            format: function()
            {
                this.inline.format('u');
            }
        };
    };
 
})(jQuery);
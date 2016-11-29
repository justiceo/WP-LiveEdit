// UnderLine format
(function($)
{
    $.Redactor.prototype.underline = function()
    {
        return {
            init: function()
            {
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

// icon formats
(function($)
{
    $.Redactor.prototype.iconic = function()
    {
        return {
            init: function ()
            {
                var icons = {
                    'format': '<i class="fa fa-paragraph"></i>',
                    'lists': '<i class="fa fa-list"></i>',
                    'link': '<i class="fa fa-link"></i>',
                    'horizontalrule': '<i class="fa fa-minus"></i>',
                    'image': '<i class="fa fa-picture-o"></i>'
                };
 
                $.each(this.button.all(), $.proxy(function(i,s)
                {
                    var key = $(s).attr('rel');
 
                    if (typeof icons[key] !== 'undefined')
                    {
                        var icon = icons[key];
                        var button = this.button.get(key);
                        this.button.setIcon(button, icon);
                    }
 
                }, this));
            }
        };
    };
})(jQuery);

// UnderLine format
(function($)
{
    $.Redactor.prototype.horizontalrule = function()
    {
        return {
            init: function()
            {
                var button = this.button.addBefore('lists', 'horizontalrule');
                this.button.addCallback(button, this.horizontalrule.format);
            },
            format: function()
            {
                this.line.insert();
            }
        };
    };
 
})(jQuery);

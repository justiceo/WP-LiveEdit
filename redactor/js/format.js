// UnderLine format
(function($)
{
    $.Redactor.prototype.ounderline = function()
    {
        return {
            init: function()
            {
                var button = this.button.addAfter('italic', 'ounderline', 'U');
                this.button.addCallback(button, this.ounderline.format);
                
                var button2 = this.button.add('increase_indent', 'Indent');
                this.button.addCallback(button2, this.indent.increase);
            },
            format: function()
            {
                this.inline.format('u');
            },
            indentIncrease: function() {
                this.indent.decrease();
                console.log(this);
                console.log(this.indent);
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
    $.Redactor.prototype.horizontalrules = function()
    {
        return {
            init: function()
            {
                var button = this.button.addBefore('lists', 'horizontalrules');
                this.button.addCallback(button, this.horizontalrules.format);
            },
            format: function()
            {
                this.line.insert();
            }
        };
    };
 
})(jQuery);

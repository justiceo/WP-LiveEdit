(function($)
{
    $.Redactor.prototype.bufferbuttons = function()
    {
        return {
            init: function()
            {
                // set button default text
                var undo = this.button.addFirst('undo', 'Undo');
                var redo = this.button.addAfter('undo', 'redo', 'Redo');
                
                // set button icon
                this.button.setIcon(undo, '<i class="fa fa-undo"></i>');
                this.button.setIcon(redo, '<i class="fa fa-repeat"></i>');
 
                // add hooks
                this.button.addCallback(undo, this.buffer.undo);
                this.button.addCallback(redo, this.buffer.redo);
            }
        };
    };
})(jQuery);
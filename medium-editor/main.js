/* custom javascript */
jQuery( document ).ready(function($) {
    console.log( "ready!" );
    var headerE = new MediumEditor('h2.entry-title');
    var autolist = new AutoList();
    var editor = "";
    var options = {
        buttonLabels: 'fontawesome',
        extensions: {
            'autolist': autolist
        },
        toolbar: {
            buttons: ['h1', 'h2', 'bold', 'italic', 'quote', 'pre', 'unorderedlist','orderedlist', 'justifyLeft', 'justifyCenter', 'anchor']
        }

    };
    var cssLink = document.getElementById('medium-editor-theme');
    $("#save-post, #cancel-editing").hide();
    $("#edit-button").click(function() {
        editor = new MediumEditor('.post-content', options);
        $(function () {
            $('.post-content').mediumInsert({
                editor: editor
            });
        });
        $("#cancel-editing, #save-post, #edit-button").toggle();
    });
    $("#cancel-editing").click(function() {
        editor.destroy();
        $("#cancel-editing, #save-post, #edit-button").toggle();
    });
});
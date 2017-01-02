/* custom javascript */
jQuery( document ).ready(function($) {
    console.log( "ready!" );
    var headerE = new MediumEditor('h2.entry-title');
    var autolist = new AutoList();

    var options = {
        buttonLabels: 'fontawesome',
        extensions: {
            'autolist': autolist
        },
        toolbar: {
            buttons: ['h1', 'h2', 'bold', 'italic', 'quote', 'pre', 'unorderedlist','orderedlist', 'justifyLeft', 'justifyCenter', 'anchor']
        }

    };
    var editor = new MediumEditor('.post-content', options);
    $(function () {
        $('.post-content').mediumInsert({
            editor: editor
        });
    });
    var cssLink = document.getElementById('medium-editor-theme');

    // no editing at start unless specified in url

    $("#edit-button").hide();
    if(getURLParameter("init-editor") != "true") {
        $("#save-post, #cancel-editing, #edit-button").toggle();
        editor.destroy();
    }

    $("#edit-button").click(function() {
        editor.setup();
        $("#cancel-editing, #save-post, #edit-button").toggle();
    });
    $("#cancel-editing").click(function() {
        editor.destroy();
        $("#cancel-editing, #save-post, #edit-button").toggle();
    });

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

});
/* custom javascript */
jQuery( document ).ready(function($) {
    console.log( "ready!" );
    var titleClass = "h2.entry-title";
    var bodyClass = ".post-content";
    var editButton = $('<a id="edit-button" class="btn btn-default">Edit</a>');
    var saveButton = $('<a id="save-post" class="btn btn-default">Save</a>');
    var cancelButton = $('<a id="cancel-editing" class="btn btn-default">Cancel</a>');
    var buttonContainer = $('<span class="medium-editor-state-buttons">');
    buttonContainer.append(editButton).append(saveButton).append(cancelButton);
    $(titleClass).before(buttonContainer);

    var headerE = new MediumEditor(titleClass);
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
    var editor = new MediumEditor(bodyClass, options);
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
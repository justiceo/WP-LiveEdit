/* custom javascript */
var smartpen_object = smartpen_object || {
    site: {},
    post: {},
    currentUser: {},
    settings: {}
};

console.log("smartpen_object", smartpen_object);

jQuery( document ).ready(function($) {
    console.log( "ready!" );
    var titleClass = "h2.entry-title";
    var contentClass = ".post-content";
    var editButton = $('<a id="edit-button" class="btn btn-default">Edit</a>');
    var saveButton = $('<a id="save-post" class="btn btn-default">Save</a>');
    var savePublishButton = $('<a id="save-publish" class="btn btn-default">Save & Publish</a>');
    var cancelButton = $('<a id="cancel-editing" class="btn btn-default">Cancel</a>');
    var buttonContainer = $('<span class="medium-editor-state-buttons">');
    buttonContainer.append(editButton).append(saveButton).append(savePublishButton).append(cancelButton);
    $(titleClass).before(buttonContainer);


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
    var bodyEditor = new MediumEditor(contentClass, options);
    var headerEditor = new MediumEditor(titleClass);
    $(function () {
        $('.post-content').mediumInsert({
            editor: bodyEditor
        });
    });
    var cssLink = document.getElementById('medium-editor-theme');

    // no editing at start unless specified in url
    $("#edit-button").hide();
    if(getURLParameter("init-editor") != "true") {
        $("#cancel-editing, #save-post, #save-publish, #edit-button").toggle();
        bodyEditor.destroy();
        headerEditor.destroy();
    }

    $("#edit-button").click(function() {
        bodyEditor.setup();
        headerEditor.setup();
        $("#cancel-editing, #save-post, #save-publish, #edit-button").toggle();
    });
    $("#cancel-editing").click(function() {
        bodyEditor.destroy();
        headerEditor.destroy();
        $("#cancel-editing, #save-post, #save-publish, #edit-button").toggle();
    });

    $("#save-post").click(function() {
        var data = {
            title: $(titleClass).text(),
            content: $(contentClass).html(),
            //date: smartpen_object.site.time,
            status: smartpen_object.post.post_status      // for the new post, this is draft
        };
        // if new post, ignore id
        var id = isNewPostPage() ? "" : smartpen_object.post.ID;
        addOrUpdate(data, id);
    });

    // if the post status is draft, display the save and publish button
    $("#save-publish").click(function(){
        var data = {
            title: $(titleClass).text(),
            content: $(contentClass).html(),
            //date: smartpen_object.site.time,
            status: 'publish'
        };
        addOrUpdate(data);
    });

    function addOrUpdate(postData, postId) {
        var origin = window.location.protocol + "//" + window.location.hostname;
        var url = origin + "/wp-json/wp/v2/posts/" + postId;
        $.ajax({
            url: url,
            method: "POST",
            data: postData,
            beforeSend: function ( xhr ) {
                xhr.setRequestHeader( 'X-WP-Nonce', smartpen_object.nonce );
            }
        }).then(function(response){
            console.log(response);
            // it was successful, take us there please!

            if(isNewPostPage()) { // redirect to newly created post
                window.location.replace(response.link + "?init-editor=true");
            }
            else if(getURLParameter("init-editor") != "true") {
                var href = window.location.href; // if it contains a query, add this to it
                var editUrl = href.includes("?") ? href + "&init-editor=true" : href + "/?init-editor=true";
                window.location.replace(editUrl);
            }
            else { // it's just an update, so reload current page
                window.location.reload();
            }
        });
    }

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

    function isNewPostPage() {
        // get post id from body of page
        return window.location.href.includes("new-post");
    }
});
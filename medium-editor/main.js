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
    var hideOnNewPostPage = ["#respond", ".simplefavorite-button", ".fusion-meta-info", ".related-posts"];
    var editButton = $('<a id="edit-button" class="btn btn-default">Edit</a>');
    var saveButton = $('<a id="save-post" class="btn btn-default">Update Post</a>');
    var savePublishButton = $('<a id="save-publish" class="btn btn-default">Save & Publish</a>');
    var cancelButton = $('<a id="cancel-editing" class="btn btn-default">Cancel</a>');
    var refreshButton = $('<a id="refresh-button" class="btn btn-default">Refresh</a>');
    var buttonContainer = $('<span class="medium-editor-state-buttons">');
    var category_opener = $('a[rel*="category"]');
    var category_modal = '<div id="category_dialog"><input id="tags-input" value="uncategorized"/><button class="tag-input-submit">Done</button></div>';
    var thePost = {
        categories: [ "test", "again"]
    };
    var categories = []; 
    buttonContainer.append(editButton).append(saveButton).append(cancelButton).append(refreshButton);
    if(smartpen_object.post.post_status != 'publish') {
        $(cancelButton).before(savePublishButton);
    }
    if(isNewPostPage()) {
        saveButton.text("Save");
        // title text should be cleared
        // body content should be cleared
        // ensure placeholders for the editors are set
    }
    $(titleClass).before(buttonContainer);
    $("body").append(category_modal);

    var autolist = new AutoList();
    var headerEditorOptions = {
        disableReturn: true,
        disableExtraSpaces: true,
        toolbar: false,
        placeholder: {
            text: 'Enter post title',
            hideOnClick: false
        }
    };
    var contentEditorOptions = {
        buttonLabels: 'fontawesome',
        placeholder: {
            text: 'Write your story here',
            hideOnClick: false
        },
        extensions: {
            'autolist': autolist
        },
        toolbar: {
            buttons: ['h1', 'h2', 'bold', 'italic', 'quote', 'pre', 'unorderedlist','orderedlist', 'justifyLeft', 'justifyCenter', 'anchor']
        }

    };
    var bodyEditor = new MediumEditor(contentClass, contentEditorOptions);
    var headerEditor = new MediumEditor(titleClass, headerEditorOptions);
    $(function () {
        $('.post-content').mediumInsert({
            editor: bodyEditor
        });
    });
    var cssLink = document.getElementById('medium-editor-theme');
    var beforeSave = [];


    $('#tags-input').tagsInput({});
    $("#category_dialog").dialog({
        autoOpen: false,
        open: function() {
                    console.log("opening tags")
                    var x = thePost.categories.join();
                    $('#tags-input').val(x);
                    
                    
                    
                    $(".tag-input-submit").click(function() {
                        console.log($('#tags-input').val());
                        $("#category_dialog").dialog("close");
                        //$('#tags-input').detach();
                    });
                }
    });
    category_opener.click(function() {
        $("#category_dialog").dialog("open");
    });


    // no editing at start unless specified in url
    $("#edit-button").hide();
    if(getURLParameter("init-editor") != "true") {
        disableEditor();
    }

    $("#edit-button").click( initEditor );
    $("#cancel-editing").click( disableEditor );

    $("#save-post").click(function() {
        var data = {
            title: $(titleClass).text(),
            content: processContent(),
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
            content: processContent(),
            status: 'publish'
        };
        addOrUpdate(data);
        $("#save-publish").hide();
    });

    $("#refresh-button").click(function(){
        refresh();
    });

    function initEditor() {
        bodyEditor.setup();
        headerEditor.setup();
        $("#cancel-editing, #save-post, #save-publish, #refresh-button, #edit-button").toggle();
    }

    function disableEditor() {
        $("#cancel-editing, #save-post, #save-publish, #refresh-button, #edit-button").toggle();
        bodyEditor.destroy();
        headerEditor.destroy();
    }

    function loadCategories() {
        $.ajax({
            url: getEndpoint() + "categories/",
            method: "GET",
            beforeSend: function ( xhr ) {
                xhr.setRequestHeader( 'X-WP-Nonce', smartpen_object.nonce );
            }
        }).then(function(response){
            response.data.forEach(function(i){ categories.push(i.name); });
        });
    }
    loadCategories();

    function loadThePost() {
        $.get(getEndpoint() + "posts/" + smartpen_object.post.ID).then(
            function(res) {
                thePost = res.data;
            }
        )
    }
    loadThePost();

    function getEndpoint() {
        var origin = window.location.protocol + "//" + window.location.hostname;
        return origin + "/wp-json/wp/v2/"
    }

    function addOrUpdate(postData, postId) {
        var origin = window.location.protocol + "//" + window.location.hostname;
        var url = origin + "/wp-json/wp/v2/posts/";
        if(postId) url = url + postId;
        beforeSave.forEach(f => f(postData));

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
                //window.location.replace(response.link + "?init-editor=true");
            }
            else if(getURLParameter("init-editor") != "true") {
                var href = window.location.href; // if it contains a query, add this to it
                var editUrl = href.includes("?") ? href + "&init-editor=true" : href + "/?init-editor=true";
                //window.location.replace(editUrl);
            }
            else { // it's just an update, so reload current page
                //window.location.reload();
            }
        });
    }

    function uploadImageToServer(imageBlog) {
        console.log("image: ", postData);
        var origin = window.location.protocol + "//" + window.location.hostname;
        var url = origin + "/wp-json/wp/v2/media/";

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
        });
    }

    function processContent() {
        $(".likebtn_container").remove();
        //uploadImages();
        return $(contentClass).html();
    }

    function uploadImages() {
        $(contentClass).find("img").filter(function(i,e){
            !e.attr("src").startsWith("http");
        }).each(function(i2, e2){ uploadImageToServer(e2.src)} )

    }

    function refresh() {
        // preserve edit mode on reload
        if(getURLParameter("init-editor") != "true") {
                var href = window.location.href; // if it contains a query, add this to it
                var editUrl = href.includes("?") ? href + "&init-editor=true" : href + "/?init-editor=true";
                window.location.replace(editUrl);
        }
        else
            window.location.reload();
    }

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

    function isNewPostPage() {
        return smartpen_object.post.ID == 466; // todo: hardcoded for now
    }

    function removeFavoriteButton( data ) {
        var content = $('<div/>').html( data.content );
        var buttons = content.find(".simplefavorite-button");
        $(buttons).each(function( i, e ) {
            $(e).parent().remove();
        });
        data.content = content.html();
        //$(".post-content").html(content.html()); // uncomment to preview effect
    }
    beforeSave.push(removeFavoriteButton);

    function resetNewPostTemplate() {
        if(!isNewPostPage()) return;
        
        // clear the title
        $(titleClass).text("");

        // clear everything in the body and set min-height
        $(contentClass).text("");
        $(contentClass).height('400px');

        // hide all the other unnecessary elements on the page
        $(hideOnNewPostPage).hide();

        // automatic init editor if not already initialized
        initEditor();
    }
    resetNewPostTemplate();
});
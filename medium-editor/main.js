/* custom javascript */
$( document ).ready(function() {
    console.log( "ready!" );
    var headerE = new MediumEditor('h2.entry-title');
    var autolist = new AutoList();
    var editor = new MediumEditor('.post-content', {
        buttonLabels: 'fontawesome',
        extensions: {
            'autolist': autolist
        },
        toolbar: {
            buttons: ['h1', 'h2', 'bold', 'italic', 'quote', 'pre', 'unorderedlist','orderedlist', 'justifyLeft', 'justifyCenter', 'anchor']
        }

    }),
    cssLink = document.getElementById('medium-editor-theme');
    $(function () {
        $('.post-content').mediumInsert({
            editor: editor
        });
    });
});
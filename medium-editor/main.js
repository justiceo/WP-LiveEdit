/* custom javascript */
$( document ).ready(function() {
    console.log( "ready!" );
    var headerE = new MediumEditor('h2.entry-title');
    var bodyE = new MediumEditor('.post-content');
    $(function () {
        $('.post-content').mediumInsert({
            editor: bodyE
        });
    });
});
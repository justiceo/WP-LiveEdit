
angular.module('le')
	.component('editor', {
		template: 'hello world',
		controller: 'EditorCtrl'
	})
.controller('EditorCtrl', function($scope, $mdDialog, $mdToast, ToolbarService) {
        var button = {
                id: 'le_edit',
                title: 'Edit',
                icon: 'icon-note',
				position: 1,
                handler: editHandler,
            };
		ToolbarService.add(button);
		
		var actionButtons = [
				{
					id: 'le_save',
					title: 'Save',
					icon: 'icon-check',
					handler: saveHandler
				},
				{
					id: 'le_cancel',
					title: 'Cancel',
					icon: 'icon-close',
					handler: cancelHandler
				}
			];
		
		// initialize editor variables for post content
		var contentClass = ".post-content";
		var autolist = new AutoList(); // for autolist plugin
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
		var contentEditor = new MediumEditor(contentClass,contentEditorOptions);
		jQuery(contentClass).mediumInsert({
            editor: contentEditor,
			addons: {
				images: {
					fileUploadOptions: { // (object) File upload configuration. See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
						url: '/upload.php', // (string) A relative path to an upload script
						acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i // (regexp) Regexp of accepted file types
					}
				},
				readmore: true,
			}
        });

		// initialize variables for post title
		var titleClass = "h2.entry-title";
		var titleEditorOptions = {
			disableReturn: true,
			disableExtraSpaces: true,
			toolbar: false,
			placeholder: {
				text: 'Enter post title',
				hideOnClick: false
			}
		};
		var titleEditor = new MediumEditor(titleClass, titleEditorOptions);

		function editHandler() {
			console.log(contentEditor);
			var length = ToolbarService.getButtons().length;
			actionButtons.forEach(function(b) {
				b.position = ++length;
				ToolbarService.add(b);
			});
			ToolbarService.remove(button);
			contentEditor.setup();
			titleEditor.setup();
			notify("Editing mode enabled");
        }
		
		function saveHandler() {
			var data = {
				title: jQuery(titleClass).text(),
				content: processContent(),
				status: smartpen_object.post.post_status
			};
			addOrUpdate(data, smartpen_object.post.ID);
			notify("Post updated");			
		}

		function processContent() {
			jQuery(".likebtn_container").remove();
			return jQuery(contentClass).html();
		}
				
		function cancelHandler() {
			actionButtons.forEach(function(b) {
				ToolbarService.remove(b);
			});
			contentEditor.destroy();
			titleEditor.destroy();
			ToolbarService.add(button);
		}

		function notify(notice) {
			$mdToast.show(
				$mdToast.simple()
					.textContent(notice)
					.position('top right')
					.hideDelay(1500)
			);
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

    
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }
});
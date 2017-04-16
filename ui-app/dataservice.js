angular.module('le')
    .factory('DataService', ['$rootScope', '$http', '$q', '$log', function ($rootScope, $http, $q, $log) {
        var service = {};
        var smartpen_object = smartpen_object || {
            site: {},
            post: {},
            currentUser: {},
            settings: {}
        };

        var origin = window.location.protocol + "//" + window.location.hostname;
        var postEndpoint = origin + "/wp-json/wp/v2/posts/";

        service.noop = function () {
            return "no op";
        }

        service.getAllCategories = function () {
            return $q.resolve([]);
        }

        service.getAllTags = function () {
            return $q.resolve([]);
        }

        service.getPost = function () {
            return $q.resolve({});
        }

        service.updatePost = function (post) {
            return $q.resolve(post);
        }

        service.getPostRevisions = function () {
            return $q.resolve({});
        }

        service.createPost = function(postTitle) {
            var payload = {"title": postTitle, "status": "draft"};
            $http.post(postEndpoint, payload).then(function(response){

            });
        }

        service.addOrUpdate = function(postData, postId) {
            var origin = window.location.protocol + "//" + window.location.hostname;
            var url = origin + "/wp-json/wp/v2/posts/" + postId;
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

        service.getURLParameter = function(name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
        }

        return service;
    }]);
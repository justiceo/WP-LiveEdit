
class DataService {
    constructor ($rootScope, $http, $q) {
        this.service = {};
        
        this.smartpen_object = window.smartpen_object ? window.smartpen_object : {
            site: {},
            post: {},
            currentUser: {},
            settings: {}
        };

        this.$q = $q;
        this.$http = $http;
        this.origin = window.location.protocol + "//" + window.location.hostname;
        this.postEndpoint = this.origin + "/wp-json/wp/v2/posts/";
    }

        noop () {
            return "no op";
        }

        getAllCategories () {
            return this.$q.resolve([]);
        }

        getAllTags () {
            return this.$q.resolve([]);
        }

        getPost () {
            return this.$q.resolve({});
        }

        updatePost (post) {
            return this.$q.resolve(post);
        }

        getPostRevisions () {
            return this.$q.resolve({});
        }

        createPost (postTitle) {
            let payload = {"title": postTitle, "status": "draft"};
            this.$http.post(this.postEndpoint, payload).then(function(response){
                console.log(response);
            });
        }

        addOrUpdate (postData, postId) {
            var origin = window.location.protocol + "//" + window.location.hostname;
            var url = origin + "/wp-json/wp/v2/posts/" + postId;
            this.beforeSave.forEach(f => f(postData));

            this.$http.post(url, postData).beforeSend(
                function ( xhr ) {
                    xhr.setRequestHeader( 'X-WP-Nonce', this.smartpen_object.nonce );
                }
            ).then(function(response){
                console.log(response);
                // it was successful, take us there please!

                if(this.isNewPostPage()) { // redirect to newly created post
                    window.location.replace(response.link + "?init-editor=true");
                }
                else if(this.getURLParameter("init-editor") != "true") {
                    var href = window.location.href; // if it contains a query, add this to it
                    var editUrl = href.includes("?") ? href + "&init-editor=true" : href + "/?init-editor=true";
                    window.location.replace(editUrl);
                }
                else { // it's just an update, so reload current page
                    window.location.reload();
                }
            });
        }

        getURLParameter (name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
        }
}
export default DataService;
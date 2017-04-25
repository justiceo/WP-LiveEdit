import angular from 'angular';

class SettingsCtrl { 
	constructor($mdDialog, ToolbarService, DataService) {
		console.log("SettingsCtrl: initializing...");
		// create the settings button and register it with toolbar service
		this.DataService = DataService;
		this.$mdDialog = $mdDialog;

		let settingsButton = {
			id: 'le_settings',
			title: 'Settings',
			icon: 'icon-settings',
			position: 4,
			handler: () => this.settingsHandler()
		};
		ToolbarService.add(settingsButton);		

		
		// holds all the information necessary to setup a post
		this.postSettings = {
			allCategories: [],	// all categories on the site (used for autocomplete)
			allTags: [], 		// all available tags on the site (for autocomplete)
			post: {
				tags: [],
				categories: []
			},			// the actual post object for the current post
			postId: 0			// makes the variable more accessible

		};

		this.categories = [];
		this.tags = [];
	}

		// when the settings button is clicked, launch the modal and load data for the forms
		settingsHandler() {
			console.log("settings: ", this, this.$mdDialog)
			this.$mdDialog.show({
				templateUrl: 'components/settings/settings.html',
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				openFrom: '#le_toolbar',
				closeTo: '#le_toolbar',
				fullscreen: true // Only for -xs, -sm breakpoints.
			});
			this.loadPostSettings();
		}

		cancel () {
			this.$mdDialog.hide();
		}


		loadPostSettings() {
			this.DataService.getAllCategories().then(
				function (categories) {
					console.log("categories: ", categories);
					this.postSettings.categories = categories;
				},
				function (error) {
					console.log("SettingsCtrl: Error loading categories", error);
				}
			);

			this.DataService.getAllTags().then(
				function (tags) {
					console.log("tags: ", tags);
					this.postSettings.allTags = tags;
				},
				function (error) {
					console.log("SettingsCtrl: Error loading tags", error);
				}
			);

			this.DataService.getPost().then(
				function (post) {
					console.log("post: ", post);
					this.postSettings.post = this.trimPostSettings(post);
				},
				function (error) {
					console.log("SettingsCtrl: Error loading post object", error);
				}
			);
		}

		// removes from the post object, properties that we don't want to risk modifying 
		// or properties that shouldn't be posted on update calls
		trimPostSettings(post) {
			var desiredProps = ["slug", "meta", "categories", "tags", "status"];
			var trimmed = {};
			desiredProps.forEach(function (p) {
				if (!post[p])	// delete after dev.
					console.log("SettingsCtrl: property ", p, " not found on this post");
				trimmed[p] = post[p];
			});
			return trimmed;
		}

		////////////
		// Functions below response to actions on the settings page (or modal)
		////////////

		savePostSetting() {
			this.DataService.updatePost(this.postSettings.post).then(
				function () {
					// todo: add md-toaster here
					console.log("SettingsCtrl: sucessfully updated post settings ");
				},
				function (error) {
					console.log("SettingsCtrl: Error updating post settings", error);
				}
			);
		}
}

const PostSettings = {
	controller: SettingsCtrl,
	templateUrl: 'components/settings/settings.html'
}
export default PostSettings
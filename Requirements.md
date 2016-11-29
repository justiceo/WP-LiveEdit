# WP-LiveEdit: Requirements Document

A front-end WYSIWYG post editing tool to improve writing experience for bloggers.
Light weight and modular. Clean code.

Tasks are to be created from this doc.

####Post importer 

*Description*
- creates a post with a given a title,
- mainly php magic
- redirects user to newly created post (and enables redactor) automatically

*Implementation Notes*



*Dependencies*



####Comments
- are included in the posts as innocent tags <comment title="boy is misspelled">Adam is a boi</comment>.
- does not affect post styling unless in editing mode
- comments cannot be deleted by selecting any portion of a commented area and clicking the comment button
- there cannot be comments within comments 
- comments are applied the way bold or link is applied. User makes a selection then comes a pop up for them to enter words.

####Post settings
- Featured image
- Tags and categories
- Post status => draft, publish, future, pending, review, art
- Enable auto-save.
- Post excerpt
- Delete post functionality
- Save and Notify handler (for authors and other stake holders)

####Core Extensions
since this would require a lot of comm with server, perform last after plugin integration
- User roles
- Post load and save events
- Load options from wp_options to determine what get's displayed into UI
- provides abraction over wp rest api and specific data type ajax requests.
	
####History
- Get revisions, server returns all revisions item for this post id, displaying date, description of changes and who made the change.
- See if you can use wp-native revisions to achieve this since the feature is already present in wp.
- Recover post, takes the current and puts in revision and takes this older post from revisions and puts it back to the main on.
- Delete revision, simply removes the entry from the revisions db, super simple I suppose.

####Widgets 
- to be saved as shortcode, 
- content displays after saving and serverside pre-render happens
- widgets in posts, non-editable sections
	
####Post quality:
- words counter
- image to text ratio
- image titles and alt
- excerpt
- categories and tags
- spell checker.
- readability scale

####Media Manager:
- upload images or specify video url
- select images from Kasoma media library
- select images from shutterstock
- request custom design image ("Describe your image in fine details and our graphics designers will take it from there"). Place holder with image name is used instead.
- if image request, show the "needs" image on the post listing in wp-admin

####Mode
- Divide functionality into "Basic", "Advanced" views/profiles
- Basic view displays all the tools necessary for quick editing without the rest of the garbage
- Advanced displays all available tools and functionality
- Allow adding new edit mode

&nbsp;
	
###Refactorings
* Merge Video into a tab in imagemanager as brand both as "media".
* Extract list buttons as icons on main toolbar (remove indents)
* Extract quote as icons on main toolbar
* shrink the headings list to H abbreviations in grid view.
* Move from text to icon toolbars for (media, table, comments and settings)
* make comments text display nicely, use a tooltip library.


###Implementation
* add post import tab in admin dashboard.
* 	- lists all import profiles, allow update and delete
*	- add new profile is a form where user enter's the classes for post title, featured-image,  content, categories and categories
*	- includes list of elements or classes to ignore so we don't import their garbage as well.
* when user enters url, the backend script determines if it has a profile, if it does, if the url is actually a post.
* scrapes and creates the post or return an error

* featured image doesn't have to be included as it is persisted as url not the html in the database.
* create post settings that includes
	- featured image (pre-rendered in UI though)
	
###WP-Plugin Options
* specify  classes for title, content, categories and tags 
* determine what admins, editors and authors see.
* persists json object to wp-options tables
* admins can add and manage import profiles.

###Final notes
* multiple redactor instances per page, save should save all of them though
* separate ones for header, featured image, content, categories and tags
* as much of what can be simplified in front-end should be simplified in front-end.



###Plugin (WP)
* loading necessary scripts in wrapper when necessary
* create a wordpress wrapper
* add api calls for saving posts (later include revisions)
* add api call for creating posts.
* pre-rendering shortcodes in page.
* deleting a post. should delete all revisions (make conditional).
* retrieving history
* retrieving and persisting redactor options.
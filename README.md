WP-LivEdit
==========

A front-end WYSIWYG post editing plugin to improve writing experience for bloggers.

For Local Development
--------------------

- cd to projects root directory
- run `npm install` 
- cd to ./medium-editor/extensions/insert-plugin/
- run `npm install` then run `bower install`
- open `project-root/medium-editor/index.html` in the browser and it should be editable



Creating an "Insert" extension
------------------------------
An "Insert" extension is simply an extension that is hooked to the (+) button on the editor (that users see on newlines).
Since the (+) button is already an extension - medium editor insert <link>, located in ./medium-editor/extensions/insert-plugin/
Any extension that hooks onto that button would need to extend medium editor insert extension

* cd into ./medium-editor/extensions/insert-plugin/
* create the plugin file from the template at https://github.com/orthes/medium-editor-insert-plugin/wiki/v2.x-Custom-addons
* run grunt and fix any code style errors that shows up till it builds successfully
* then enable the plugin in core.js by adding it to the list of default loaded plugins
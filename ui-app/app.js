/**
 * Created by I853985 on 2/6/2017.
 */
angular.module('le', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ui.bootstrap'])
    .controller('ToolbarCtrl', function($uibModal, $uibTooltip, $mdDialog, ToolbarService) {
        var toolbar = this;
        toolbar.$uibModal = $uibModal;
        console.log("toolbar service nooop: ", ToolbarService);
        toolbar.buttons = [
            {
                id: 'le_edit',
                title: 'Edit',
                icon: 'icon-note',
                handler: editHandler
            },
            {
                id: 'le_revisions',
                title: 'Revisions',
                icon: 'icon-clock',
                handler: revisionsHandler
            },
            {
                id: 'le_settings',
                title: 'Settings',
                icon: 'icon-settings',
                handler: settingsHandler
            },
            {
                id: 'le_help',
                title: 'Help',
                icon: 'icon-question',
                handler: helpHandler
            },
            {
                id: 'le_save',
                title: 'Save',
                icon: 'icon-check',
                handler: noop
            },
            {
                id: 'le_publish',
                title: 'Publish',
                icon: 'icon-cursor',
                handler: noop
            },
            {
                id: 'le_cancel',
                title: 'Cancel',
                icon: 'icon-close',
                handler: cancelHandler
            }
        ];
        toolbar.default_visible = ["le_edit", "le_revisions", "le_settings", "le_help"];
        toolbar.visible_buttons = [];

        setToolbarButtons(toolbar.default_visible);

        function noop() { console.log("no op"); }

        function editHandler() {
            var editor_buttons = ["le_save", "le_publish", "le_cancel"];
            setToolbarButtons(editor_buttons);
        }

        toolbar.handler = function (arg) {
            console.log("handled", arg);
        }

        function handler2() {
            console.log("handler2");
        }

        function revisionsHandler() {
            // selecting a revision only drops it's contents in the dom (doesn't persist) - so it's basically a "preview"
            // user should choose to "save" the preview as the post or cancel to return to original
            /*toolbar.$uibModal.open({
                animation: true,
                template: '<post-revisions>',
                size: 'md'
            });*/
            $mdDialog.show({
              template: '<post-revisions>',
              parent: angular.element(document.body),
              clickOutsideToClose:true,
              openFrom: '#le_toolbar',
              closeTo: '#le_toolbar',
              fullscreen: true // Only for -xs, -sm breakpoints.
            });
            var rev_buttons = ["le_revisions", "le_save", "le_publish", "le_cancel"];
            setToolbarButtons(rev_buttons);
        }

        function settingsHandler() {
            $mdDialog.show({
              template: '<post-settings>',
              parent: angular.element(document.body),
              clickOutsideToClose:true,
              openFrom: '#le_toolbar',
              closeTo: '#le_toolbar',
              fullscreen: true // Only for -xs, -sm breakpoints.
            });
        }

        function helpHandler() {
            // open the modal 
            $mdDialog.show({
              template: '<le-help>',
              parent: angular.element(document.body),
              clickOutsideToClose:true,
              openFrom: '#le_toolbar',
              closeTo: '#le_toolbar',
              fullscreen: true // Only for -xs, -sm breakpoints.
            });
        }

        function cancelHandler() {
            setToolbarButtons(toolbar.default_visible);
        }

        // with this setup, a user would have to either save content or cancel if they want to see just the help page.
        // proposition: add and disable the cancel and save buttons
        function setToolbarButtons(buttons) {
            buttons = buttons || [];
            toolbar.visible_buttons = [];
            toolbar.buttons.forEach(function(b){
                if( buttons.includes(b.id) )
                    toolbar.visible_buttons.push(b);
                });
        }

        function initTooltips() {
            $(function () {
                var tooltipOptions = {
                    placement: 'top',
                    delay: {"show": 800, "hide": 100}
                };
                $(toolbarButtons).each(function (i, e) {
                    $(e).tooltip(tooltipOptions);
                });
            });
        }

        function openComponentModal () {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                resolve: {
                    items: function () {
                        return $ctrl.items;
                    }
                }
            });
        }

        function initPopovers() {
            // init all popovers
            $(function () {
                // increase the top offset of the popover
                // or just move over to modals (modals are better at responsiveness and weird ui adaptations)
                // clicking on the button twice should also close the popover (if it's open)
                // add a backdrop to discourage users from taking other actions while popover is open
                // see http://stackoverflow.com/a/16487117/3665475
                // add a callback function to load data in the content
                var options = {
                    html: true,
                    placement: "top",
                    title: "Post Revisions",
                    trigger: 'focus',
                    content: '<div class="loader">Loading...</div><p style="white-space: nowrap; width: 100%">Hello world safda fdfa dsf sdf asdfsad fsdfasdf asdf asdf dsfasf sadf sadfsdf a fadf asdfsadf d</p>',
                    template: '<div class="le popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
                }
                $(".le_revisions a").popover(options);
            });
        }
    })
    .component('leToolbar', {
        templateUrl: 'toolbar.html',
        controller: 'ToolbarCtrl'
    })
;

class ToolbarController {
	/*@ngInject*/
	constructor(ToolbarService) {
		this.buttons = ToolbarService.getButtons();
	}
	
}

const toolbarComponent = {
	template: require('./toolbar.html'),
	controller: ToolbarController
};

export default toolbarComponent;
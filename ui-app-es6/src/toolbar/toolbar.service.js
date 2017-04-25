/**
 * Created by Justice on 2/7/2017.
 */
class ToolbarService {
    constructor() {
        this.buttons = [];
        this.buttons.push(
            {
                id: 'le_edit',
                title: 'Edit',
                icon: 'icon-note',
				position: 1,
                handler: this.noop
            }
        );
    }
        noop () {
            return "no op";
        }

        getButtons () {
            return this.buttons;
        }

        add (button) {

            console.log("TbService: adding button - ", button.title);

            // if user didn't specify an index, then it's last
            if (!button.position)
                button.position = 1000;

            // if button already exist, don't add it.
            for (let b of this.buttons) {
                if (b.id == button.id) {
                    console.log(b.id, " already exists")
                    return;
                }
            }

            this.buttons.push(button);
            this.buttons.sort(function (a, b) {
                if (a.position < b.position)
                    return -1;
                else if (a.position > b.position)
                    return 1;
                else return 0;
            });

            // todo: change this to use a single loop insert. above is inefficient
        }

        remove (button) {
            console.log("TbService: remove button ", button.title);
            var index = this.buttons.indexOf(button);
            if (index > -1) {
                this.buttons.splice(index, 1);                
            }
            else {
                console.log(button.title, " not found");
            }
        }

        disable(button) {
            var index = this.buttons.indexOf(button);
            this.buttons[index].disabled = true;
        }

        enable (button) {
            var index = this.buttons.indexOf(button);
            this.buttons[index].disabled = false;
        }    
}
export default ToolbarService;


export default class Dialog {

    constructor(dialogManager, id) {        
        this.dialogManager = dialogManager;
        this.domElement = document.getElementById(id);
    }

    open() {

        // utilizing both experimental new feature and old cross-browser one

        if (this.domElement.show && typeof this.domElement.show === 'function') {
            this.domElement.show();
        } else {
            this.domElement.setAttribute('open')
            this.domElement.setAttribute('display', 'block')
        }

    }

    close() {

        // utilizing both experimental new feature and old cross-browser one

        if (this.domElement.close && typeof this.domElement.close === 'function') {
            this.domElement.close();
        } else {
            this.domElement.removeAttribute('open')
            this.domElement.setAttribute('display', 'none')
        }
    }
}
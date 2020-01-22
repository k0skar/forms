
export default class SpecDialog {

    constructor(DialogManager) {
        this.htmlElement = document.getElementById('dialogSpec');
        this.htmlTextInputFields = {
            firstName: '',
            lastName: '',
            login: '',
            companyName: '',
            password: '',
            passwordConfirm: '',
        };
        const form = this.htmlElement.querySelector('form');

        form.addEventListener('submit', onNextBtnInitialDialog(e));        
    }

    open() {
        this.htmlElement.show();
    }

    onNextBtnSpecDialog(e) {
        const fieldValues = {

        }
                
        
        if (validate(fieldValues)) {
            this.htmlElement.close();
        }
    }

    validate() {
        return true
    }


}
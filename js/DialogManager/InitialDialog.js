import Dialog from "./Dialog.js"

export default class InitialDialog extends Dialog {

    constructor(dialogManager, id) {
        super(dialogManager, id);
        const nextButton = this.domElement.querySelector('#btnNextInitial');
        nextButton.addEventListener('click', (e) => this.onNextBtnClick(e));
        this.inputsDomEl = {
            firstName: this.domElement.querySelector('#firstName'),
            lastName: this.domElement.querySelector('#lastName'),
            login: this.domElement.querySelector('#login'),
            email: this.domElement.querySelector('#email'),
            companyName: this.domElement.querySelector('#companyName'),
            password: this.domElement.querySelector('#password'),
            passwordConfirm: this.domElement.querySelector('#passwordConfirm'),
        };
        this.setInitialValues();
    }

    setInitialValues() {
        for (const key in this.inputsDomEl) {
            if(this.dialogManager.state.initialDialog[key]) {
                this.inputsDomEl[key].value = this.dialogManager.state.initialDialog[key];
            }
        } 
    }

    onNextBtnClick(e) {
        const inputValues = this.processInputs();

        if (inputValues) {
            this.dialogManager.procedeNextInitialDialog(inputValues);
        }
    }

    processInputs() {

        for (const key in this.inputsDomEl) {
            this.inputsDomEl[key].parentElement.classList.remove('error')
        }

        const inputValues = {
            firstName: this.processFirstName(),
            lastName: this.processLastName(),
            login: this.processLogin(),
            email: this.processEmail(),
            companyName: this.processCompanyName(),
            password: this.processPassword(),
            passwordConfirm: this.processPasswordConfirm(),
        }
        let allInputsAreValid = true;

        for (const key in inputValues) {
            if (key !== 'companyName' && inputValues[key] === false) {
                allInputsAreValid = false;
                break
            }

        }

        return allInputsAreValid ? inputValues : false
    }

    processFirstName() {

        const nonEmptyLettersOnly = new RegExp('^[A-Za-z]+$');
        const firstName = this.inputsDomEl.firstName;

        if (firstName.value.match(nonEmptyLettersOnly)) {
            return firstName.value
        } else {
            firstName.parentElement.classList.add('error');
            return false
        }
    }

    processLastName() {

        const nonEmptyLettersOnly = new RegExp('^[A-Za-z]+$');
        const lastName = this.inputsDomEl.lastName;

        if (lastName.value.match(nonEmptyLettersOnly)) {
            return lastName.value
        } else {
            lastName.parentElement.classList.add('error');
            return false
        }
    }

    processLogin() {

        const login = this.inputsDomEl.login;

        if (login.value.trim().length > 0) {
            return login.value
        } else {
            login.parentElement.classList.add('error');
            return false
        }
    }

    processEmail() {

        const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        const email = this.inputsDomEl.email;

        if (email.value.match(emailRegExp)) {
            return email.value
        } else {
            email.parentElement.classList.add('error');
            return false
        }
    }

    processCompanyName() {

        return this.inputsDomEl.companyName.value
    }

    processPassword() {

        const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*~])[A-Za-z\d!@#$%^&*~]/;
        const password = this.inputsDomEl.password;

        if (password.value.match(passwordRegEx)) {
            return password.value
        } else {
            password.parentElement.classList.add('error');
            return false
        }
    }

    processPasswordConfirm() {

        const password = this.inputsDomEl.password;
        const passwordConfirm = this.inputsDomEl.passwordConfirm;

        if (password.value && password.value === passwordConfirm.value) {
            return passwordConfirm.value
        } else {
            passwordConfirm.parentElement.classList.add('error');
            return false
        }
    }
}
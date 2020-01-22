
export default class InitialDialog {

    constructor(dialogManager) {
        this.dialogManager = dialogManager;
        this.htmlElement = document.getElementById('dialogInitial');
        const nextButton = this.htmlElement.querySelector('#btnNextInitial');
        nextButton.addEventListener('click', this.onNextBtnInitialDialog.bind(this))
        this.htmlInputs = {
            firstName: this.htmlElement.querySelector('#firstName'),
            lastName: this.htmlElement.querySelector('#lastName'),
            login: this.htmlElement.querySelector('#login'),
            email: this.htmlElement.querySelector('#email'),
            companyName: this.htmlElement.querySelector('#companyName'),
            password: this.htmlElement.querySelector('#password'),
            passwordConfirm: this.htmlElement.querySelector('#passwordConfirm'),
        };
    }

    open() {
        if (this.htmlElement.show && typeof this.htmlElement.show === 'function') {
            this.htmlElement.show();
        } else {
            this.htmlElement.setAttribute('open')
        }

    }

    close() {
        if (this.htmlElement.close && typeof this.htmlElement.close === 'function') {
            this.htmlElement.close();
        } else {
            this.htmlElement.removeAttribute('open')
        }
    }

    onNextBtnInitialDialog(e) {
        const inputValues = this.processInputs();
        if (inputValues) {
            this.dialogManager.procedeNextInitialDialog(inputValues);
        }
    }

    processInputs() {
        
        for (const key in this.htmlInputs) {
            this.htmlInputs[key].parentElement.classList.remove('error')
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
        const firstName = this.htmlInputs.firstName;

        if (firstName.value.match(nonEmptyLettersOnly)) {
            return firstName.value
        } else {
            firstName.parentElement.classList.add('error');
            return false
        }
    }

    processLastName() {

        const nonEmptyLettersOnly = new RegExp('^[A-Za-z]+$');
        const lastName = this.htmlInputs.lastName;

        if (lastName.value.match(nonEmptyLettersOnly)) {
            return lastName.value
        } else {
            lastName.parentElement.classList.add('error');
            return false
        }
    }

    processLogin(regEx) {

        const login = this.htmlInputs.login;

        if (login.value.trim().length > 0) {
            return login.value
        } else {
            login.parentElement.classList.add('error');
            return false
        }
    }

    processEmail() {

        const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        const email = this.htmlInputs.email;

        if (email.value.match(emailRegExp)) {
            return email.value
        } else {
            email.parentElement.classList.add('error');
            return false
        }
    }

    processCompanyName() {

        return this.htmlInputs.companyName.value
    }

    processPassword(regEx) {

        const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*~])[A-Za-z\d!@#$%^&*~]/;
        const password = this.htmlInputs.password;

        if (password.value.match(passwordRegEx)) {
            return password.value
        } else {
            password.parentElement.classList.add('error');
            return false
        }
    }

    processPasswordConfirm() {

        const password = this.htmlInputs.password;
        const passwordConfirm = this.htmlInputs.passwordConfirm;

        if (password.value && password.value === passwordConfirm.value) {
            return passwordConfirm.value
        } else {
            passwordConfirm.parentElement.classList.add('error');
            return false
        }
    }
}
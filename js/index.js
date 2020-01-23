
class DialogManager {

    constructor () {

        this.state = {
            initialDialog: {
                firstName: '',
                lastName: '',
                login: '',
                email: '',
                companyName: '',
                password: '',
                passwordConfirm: '',
            },
            specDialog: {
                department: '',
                vacancy: '',
            },
        }

        this.initialDialog = new InitialDialog(this, 'dialogInitial');
        this.specDialog = new SpecDialog(this, 'dialogSpec');
        this.checkDialog = new CheckDialog(this, 'dialogCheck');
        this.initialDialog.init();
        this.initialDialog.open();
    }


    procedeNextInitialDialog(dialogState) {
        if(dialogState.hasOwnProperty(Object.keys(this.state.initialDialog)[0])) {
            this.state.initialDialog = dialogState;
        }
        
        this.initialDialog.close();
        this.specDialog.init()
        this.specDialog.open();
    }

    procedeNextSpecDialog(dialogState) {

        this.state.specDialog = dialogState;
        this.specDialog.close();
        this.checkDialog.init();
        this.checkDialog.open();
    }
    
    procedeEditCheckDialog() {
        
        this.checkDialog.close();
        this.initialDialog.init();
        this.initialDialog.open();
    }
    
    procedeSendCheckDialog() {
        
        localStorage.setItem('userInfo', JSON.stringify(this.state));
        this.checkDialog.setThanks();
    }
}

class Dialog {

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

class InitialDialog extends Dialog {

    constructor(dialogManager, id) {
        super(dialogManager, id);
        
        const nextButton = this.domElement.querySelector('#btnNextInitial');
        nextButton.addEventListener('click', (e) => this.onNextBtnClick(e));
    }

    init() {
        
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
class SpecDialog extends Dialog {

    constructor(dialogManager, id) {
        super(dialogManager, id)

        this.departmentDomEl = this.domElement.querySelector('#departmentSelect');
        this.vacancyDomEl = this.domElement.querySelector('#vacancySelect');
        this.nextButton = this.domElement.querySelector('#btnNextSpec');

        //listeners are appended once on construction and live the app's lifetime

        this.vacancyDomEl.addEventListener('change', (e) => this.onVacancySelect(e));
        this.departmentDomEl.addEventListener('change', (e) => this.onDepartmentSelect(e));
        this.nextButton.addEventListener('click', (e) => this.onNextBtnClick(e));
    }

    init() {
        this.dataJSON = `{
            "departments":
             { "Sales" : [ "Sales Manager", "Account Manager" ], 
               "Marketing" : [ "Creative Manager", "Marketing Coordinator", "Content Writer" ],
               "Technology" : [ "Project Manager", "Software Developer", "PHP programmer", "Front End", "Quality Assurance" ]
            }
        }`;
        this.selectedDepartment = this.dialogManager.state.specDialog.department;
        this.selectedVacancy = this.dialogManager.state.specDialog.vacancy;

        this.nextButton = this.domElement.querySelector('#btnNextSpec');
        const departmentsArray = Object.keys(JSON.parse(this.dataJSON).departments);

        this.vacancyDomEl.setAttribute('disabled', '');

        this.departmentDomEl.innerHTML = this.createDepartments(departmentsArray);
    }

    createDepartments(data) {
        let optionsHtml = '';

        if(!data.includes(this.selectedDepartment)) {
            optionsHtml += `<option selected disabled>Department</option>`            
        } else {
            const data = JSON.parse(this.dataJSON).departments[this.selectedDepartment];
            this.setVacancies(data);
        }

        for (const item of data) {
            if(item === this.dialogManager.state.specDialog.department) {
                optionsHtml += `<option selected >${item}</option>`
            } else {
                optionsHtml += `<option>${item}</option>`;
            }            
        }

        return optionsHtml
    }

    onDepartmentSelect(e) {
        var selectedText = e.target[e.target.selectedIndex].text;

        this.selectedDepartment = selectedText;

        // The place to make a query for an updated JSON, if that's the case

        const data = JSON.parse(this.dataJSON).departments[selectedText];
        this.setVacancies(data);
    }

    setVacancies(data) {
        this.vacancyDomEl.removeAttribute('disabled');
        this.vacancyDomEl.innerHTML = this.createVacancies(data);
    }

    onVacancySelect(e) {
        var selectedText = e.target[e.target.selectedIndex].text;

        this.selectedVacancy = selectedText;
    }

    createVacancies(data) {
        let optionsHtml = '';

        if(!data.includes(this.selectedVacancy)) {
            optionsHtml += `<option selected disabled>Vacancy</option>`            
        } 

        for (const item of data) {
            if(item === this.selectedVacancy) {
                optionsHtml += `<option selected >${item}</option>`
            } else {
                optionsHtml += `<option>${item}</option>`;
            }            
        }

        return optionsHtml
    }

    onNextBtnClick(e) {
        const inputValues = this.processInputs();

        if (inputValues) {
            this.dialogManager.procedeNextSpecDialog(inputValues);
        }
    }

    processInputs() {

        this.departmentDomEl.parentElement.classList.remove('error');
        this.vacancyDomEl.parentElement.classList.remove('error');

        if (!this.selectedDepartment) {
            this.departmentDomEl.parentElement.classList.add('error');
        }
        if (!this.selectedVacancy) {
            this.vacancyDomEl.parentElement.classList.add('error');
        }
        const inputValues = {
            department: this.selectedDepartment,
            vacancy: this.selectedVacancy,
        }

        return inputValues.department && inputValues.vacancy ? inputValues : false
    }
}

class CheckDialog extends Dialog {

    constructor(dialogManager, id) {
        super(dialogManager, id);

        const sendButton = this.domElement.querySelector('#btnSendCheck');
        const editButton = this.domElement.querySelector('#btnEditCheck');

        //listeners are appended once on construction and live the app's lifetime

        editButton.addEventListener('click', () => this.onEditBtnClick());
        sendButton.addEventListener('click', () => this.onSendBtnClick());
    }

    init() {

        const itemsContainer = this.domElement.querySelector('#containerItemsCheck');
        itemsContainer.innerHTML = this.createItems({ ...this.dialogManager.state.initialDialog, ...this.dialogManager.state.specDialog });
    }

    createItems(data) {
        let itemsHtml = '';
        const dataMap = new Map([
            ['Name', data.firstName + ' ' + data.lastName],
            ['Login', data.login],
            ['Email', data.email],
            ['Company', data.companyName],
            ['Department', data.department],
            ['Job Title', data.vacancy],
        ]);

        let itemHtml = `<div class='item-check'>
                            <span>Name</span>
                            <span>John Smit</span>
                        </div>`;

        for (const item of dataMap) {
            itemsHtml += `<div class='item-check'>
                                <span>${item[0]}:</span>
                                <span>${item[1]}</span>
                          </div>`;
        }

        return itemsHtml
    }

    onSendBtnClick() {
        this.dialogManager.procedeSendCheckDialog();
    }

    onEditBtnClick() {
        this.dialogManager.procedeEditCheckDialog();
    }

    setThanks() {
        const section = this.domElement.querySelector('#sectionCheck');

        section.innerHTML = `<footer>
                                <h5>Thank you!</h5>
                             </footer>`
    }
}

new DialogManager();
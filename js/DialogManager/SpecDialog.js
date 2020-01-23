import Dialog from "./Dialog.js"

export default class SpecDialog extends Dialog {

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
        this.selectedDepartment = null;
        this.selectedVacancy = null;

        this.nextButton = this.domElement.querySelector('#btnNextSpec');
        const departmentsArray = Object.keys(JSON.parse(this.dataJSON).departments);

        this.vacancyDomEl.setAttribute('disabled', '');

        this.departmentDomEl.innerHTML = this.createDepartments(departmentsArray);
    }

    createDepartments(data) {
        let optionsHtml = `<option selected disabled>Department</option>`;

        for (const item of data) {
            optionsHtml += `<option>${item}</option>`;
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
        let optionsHtml = `<option value="" selected disabled>Vacancy</option>`;

        for (const item of data) {
            optionsHtml += `<option value="">${item}</option>`;
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
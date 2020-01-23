import Dialog from "./Dialog.js"

export default class InitialDialog extends Dialog {

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
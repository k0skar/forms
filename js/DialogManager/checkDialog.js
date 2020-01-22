import Dialog from "./Dialog.js"

export default class InitialDialog extends Dialog {

    constructor(dialogManager, id) {
        super(dialogManager, id);

        this.init();
    }

    init() {
        const sendButton = this.domElement.querySelector('#btnSendCheck');
        const editButton = this.domElement.querySelector('#btnEditCheck');
        const itemsContainer = this.domElement.querySelector('#containerItemsCheck');

        editButton.addEventListener('click', () => this.onEditBtnClick());
        sendButton.addEventListener('click', () => this.onSendBtnClick());
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

        itemsHtml += ''

        return itemsHtml
    }

    onSendBtnClick() {
        this.dialogManager.procedeSendCheckDialog();
    }

    onEditBtnClick() {
        this.dialogManager.procedeEditCheckDialog();
    }
}
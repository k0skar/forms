import InitialDialog from "./InitialDialog.js";
import SpecDialog from "./SpecDialog.js";
import CheckDialog from "./CheckDialog.js";

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
 
export default DialogManager;
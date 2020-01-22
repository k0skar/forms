import InitialDialog from "./InitialDialog.js";
import * as data from './specs.js';

class DialogManager {

    constructor () {

        this.state = {
            initialDialog: {
                firstName: '',
                lastName: '',
                login: '',
                companyName: '',
                password: '',
                passwordConfirm: '',
            },
            specDialog: {
                department: '',
                vacancy: '',
            },
        }

        this.initialDialog = new InitialDialog(this);
        // this.specDialog = new SpecDialog(this);
        // this.checkDialog = new CheckDialog(this);
        this.initialDialog.open();
    }


    procedeNextInitialDialog(dialogState) {
        if(dialogState.hasOwnProperty(Object.keys(this.state.initialDialog)[0])) {
            this.state.initialDialog = dialogState;
        }
        
        this.initialDialog.close();
        // this.specDialog.open();
    }

    procedeNextSpecDialog(dialogState) {

        this.state.specDialog = dialogState;
        // this.specDialog.close();
        // this.checkDialog.open();
    }
    
    procedeEditCheckDialog(dialogState) {

        this.state.specDialog = dialogState;
        this.checkDialog.close();
        this.initialDialog.open();
    }
    
    procedeSendCheckDialog() {
        
        this.specDialog.close();
    }
}
 
export default DialogManager;
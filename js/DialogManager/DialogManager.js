import InitialDialog from "./InitialDialog.js";
import SpecDialog from "./SpecDialog.js";

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

        this.initialDialog = new InitialDialog(this, 'dialogInitial');
        this.specDialog = new SpecDialog(this, 'dialogSpec');
        //this.checkDialog = new CheckDialog(this, 'dialogCheck');
        this.initialDialog.open();
        //this.specDialog.open();
    }


    procedeNextInitialDialog(dialogState) {
        if(dialogState.hasOwnProperty(Object.keys(this.state.initialDialog)[0])) {
            this.state.initialDialog = dialogState;
        }
        
        this.initialDialog.close();
        this.specDialog.open();
    }

    procedeNextSpecDialog(dialogState) {

        this.state.specDialog = dialogState;
        this.specDialog.close();
        console.log(this.state)
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
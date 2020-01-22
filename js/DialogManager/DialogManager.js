import InitialDialog from "./InitialDialog.js";
import SpecDialog from "./SpecDialog.js";
import CheckDialog from "./CheckDialog.js";

class DialogManager {

    constructor () {

        this.state = {
            initialDialog: {
                firstName: 'Vasye',
                lastName: 'Pupkeo',
                login: '!VaPu11',
                email: 'vapiu@i.ua',
                companyName: 'Gago',
                password: '!W1w',
                passwordConfirm: '!W1w',
            },
            specDialog: {
                department: 'RND',
                vacancy: 'Researcher',
            },
        }

        this.initialDialog = new InitialDialog(this, 'dialogInitial');
        this.specDialog = new SpecDialog(this, 'dialogSpec');
        this.checkDialog = new CheckDialog(this, 'dialogCheck');
        this.initialDialog.open();
        //this.checkDialog.open();
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
        this.checkDialog.open();
    }
    
    procedeEditCheckDialog() {

        this.checkDialog.close();
        this.initialDialog.open();
    }
    
    procedeSendCheckDialog() {
        
        this.specDialog.close();
    }
}
 
export default DialogManager;
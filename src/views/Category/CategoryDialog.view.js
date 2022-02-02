import React, {Component} from 'react'
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class CategoryDialog extends Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }
    render() {
        return(
            <Dialog
                fullScreen
                open={this.props.open}
                onClose={this.props._handleClose}
                TransitionComponent={Transition}
            >
            </Dialog>
        )
    }
}
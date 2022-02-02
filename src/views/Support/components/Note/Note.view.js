import React, {Component} from 'react';
import styles from './Style.module.css'
import {Add} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import BottomBar from '../../../../components/BottomBar/BottomBar.component';
import NoteDialog from '../Note/NoteDialog.view'

class Note extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            note: false
        }
        this._handleNote = this._handleNote.bind(this);
        this._handleCancel = this._handleCancel.bind(this);
    }

    _renderNoteCard(){
        return(
            <div>
                <div className={styles.noteCard}>
                    <div className={styles.note}>
                        Record of the call or email is added here in text.Record of the call or email is added here in text.Record of the call or email is added here in text.
                    </div>
                    <div className={styles.recordFlex}>
                        <div className={styles.assignedTo}>
                            <img src={require('../../../../assets/img/profile.png')} alt="" height={30}/>
                            <div className={styles.assignee}>
                                <div className={styles.assign}>Ashutosh Prasad</div>
                                <div>12/11/2021 | 12:36 PM</div>
                            </div>
                        </div>
                        <div className={styles.event}>
                            Call Log
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _handleNote(){
        this.setState({
            note: true
        })
    }

    _handleCancel() {
        this.setState({
            note: false
        });
    }

    render() {
        return(
            <div>
                <div className={styles.plain}>
                    <div className={styles.noteFlex}>
                        <div>
                            <div>Last Updated On</div>
                            <div className={styles.weight}>12/12/2021 | 1:00 PM</div>
                        </div>
                        <div>
                            <Button onClick={this._handleNote} variant={'contained'} color={'primary'}>
                                <Add></Add> Add Note
                            </Button>
                        </div>
                    </div>
                    <br/>
                    <div className={styles.plain}>
                        {this._renderNoteCard()}
                    </div>
                </div>
                <NoteDialog open={this.state.note} handleClose={this._handleCancel}/>
                {/*<BottomBar open={this.state.open}>*/}
                {/*    Helllo*/}
                {/*</BottomBar>*/}
            </div>
        )
    }
}

export default Note

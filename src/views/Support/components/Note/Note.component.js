import React, {Component} from 'react';
import styles from './Style.module.css'
import {Add} from "@material-ui/icons";
import {Button} from "@material-ui/core";
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
        const {data} = this.props;
        return(
            <div>
                <div className={styles.noteCard}>
                    <div className={styles.note}>
                        {data.note}
                    </div>
                    <div className={styles.recordFlex}>
                        <div className={styles.assignedTo}>
                            <img src={require('../../../../assets/img/profile.png')} alt="" height={30}/>
                            <div className={styles.assignee}>
                                <div className={styles.assign}>{data.user.name}</div>
                                <div>{data.createdAt}</div>
                            </div>
                        </div>
                        <div className={styles.event}>
                            {data.event_type}
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
            <div className={styles.plain}>
                {this._renderNoteCard()}
            </div>
        )
    }
}

export default Note

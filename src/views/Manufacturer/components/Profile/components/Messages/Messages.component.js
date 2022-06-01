import React, {Component} from 'react';
import styles from './Style.module.css';

class Messages extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    _renderNoteCard(){
        const {data} = this.props;
        return(
            <div>
                <div className={styles.noteCard}>
                    <div className={styles.note}>
                        Record of the call or email is added here in text.
                    </div>
                    <div className={styles.recordFlex}>
                        <div className={styles.assignedTo}>
                            <img src={require('../../../../../../assets/img/profile.png')} alt="" height={30}/>
                            <div className={styles.assignee}>
                                <div className={styles.assign}>Ashutosh Prasad</div>
                                <div>11/10/2022 | 12:36 PM</div>
                            </div>
                        </div>
                        <div className={styles.event}>

                        </div>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        return(
            <div className={styles.plain}>
                {this._renderNoteCard()}
            </div>
        )
    }
}

export default Messages

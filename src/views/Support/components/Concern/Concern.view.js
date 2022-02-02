import React, {Component} from 'react';
import styles from './Style.module.css'

class Concern extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div>
                <div className={styles.plain}>
                    <div>
                        <div className={styles.heading}>Concern</div>
                        <div className={styles.desc}>REQUEST FOR PARTNERSHIP</div>
                    </div>
                    <div>
                        <div className={styles.heading}>Description</div>
                        <div className={styles.desc}>Show complete discription in full as provided by user in many lines required.<br/>
                        Show complete discription in full as provided by user in many lines required</div>
                    </div>
                    <div>
                        <div className={styles.heading}>Order/Txn Id</div>
                        <div className={styles.desc}>121/12/21/21/111</div>
                    </div>
                    <div>
                        <div className={styles.heading}>Preferred Mode</div>
                        <div className={styles.desc}>Any</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Concern

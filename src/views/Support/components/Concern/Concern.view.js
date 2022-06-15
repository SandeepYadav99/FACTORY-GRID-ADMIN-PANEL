import React, {Component} from 'react';
import styles from './Style.module.css'
import {WaitingComponent} from "../../../../components/index.component";

class Concern extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const {data,isfetching} = this.props;
        if (isfetching || data === null) {
            return (<WaitingComponent/>)
        }
        return(
            <div>
                <div className={styles.plain}>
                    <div>
                        <div className={styles.heading}>Communication Preference</div>
                        <div className={styles.desc}>{data.communication_preference}</div>
                    </div>
                    <div>
                        <div className={styles.heading}>Transaction Number</div>
                        <div className={styles.desc}>{data.transaction_number ? data.transaction_number : 'N/A'}</div>
                    </div>
                    <div>
                        <div className={styles.heading}>Issue</div>
                        <div className={styles.desc}>{data.message}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Concern

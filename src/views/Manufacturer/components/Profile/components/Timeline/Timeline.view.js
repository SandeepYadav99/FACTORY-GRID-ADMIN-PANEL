import React, {Component} from 'react';
import styles from './Style.module.css'
import {ButtonBase} from "@material-ui/core";

class Timeline extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    _renderTimeline(){
        return [1,2,3].map(() => {
            return(
                <div>
                    <div className={styles.timelineFlex}>
                        <div className={styles.date}>
                            12<br/>OCT
                        </div>
                        <div className={styles.totalTimeline}>
                            <div className={styles.weight}>12/10/2021 | 1.00 PM</div>
                            <div className={styles.weight}>Call back Requested</div>
                            {/*<div>Status: <span className={styles.error}>Pending</span></div>*/}
                            {/*<div>Priority: <span className={styles.low}>Low</span></div>*/}
                            <div>Comment line with the action shall be stated here</div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return(
            <div className={styles.activityContainer}>
                {this._renderTimeline()}
                <div className={styles.viewBtn}>
                    <ButtonBase className={styles.viewMore}>View More</ButtonBase>
                </div>
            </div>
        )
    }
}

export default Timeline

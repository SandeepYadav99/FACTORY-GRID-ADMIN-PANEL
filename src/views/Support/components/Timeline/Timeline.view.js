import React, {Component} from 'react';
import styles from './Style.module.css'

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
                            <div className={styles.weight}>Case Reported</div>
                            <div>Status: <span className={styles.error}>Pending</span></div>
                            <div>Priority: <span className={styles.error}>High</span></div>
                            <div>User: System</div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return(
            <div>
                <div className={styles.plain}>
                    <div className={styles.title}>Timeline</div>
                    <br/>
                    <div>
                        {this._renderTimeline()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Timeline

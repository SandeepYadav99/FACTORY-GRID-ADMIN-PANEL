import React, {Component} from 'react';
import styles from './Style.module.css'
import {ButtonBase} from "@material-ui/core";
import {KeyboardArrowRight} from "@material-ui/icons";

class Queries extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    _renderTimeline(){
        return [1,2,3].map(() => {
            return(
                <div className={styles.queryFlex}>
                    <div className={styles.timelineFlex}>
                        <div className={styles.date}>
                            12<br/>OCT
                        </div>
                        <div className={styles.totalTimeline}>
                            <div className={styles.caseFlex}>
                                <div className={styles.weight}>CASE ID</div>
                                <div className={styles.status}>Status</div>
                            </div>
                            <div className={styles.weight}>12/10/2021 | 1.00 PM</div>
                            <div className={styles.weight}>Call Concern</div>
                            <div>Last Updated: 12/02/2022</div>
                        </div>
                    </div>
                    <div className={styles.rightArrow}>
                        <KeyboardArrowRight fontSize={'large'}/>
                    </div>
                </div>
            )
        })
    }

    render() {
        return(
            <div className={styles.activityContainer}>
                <div className={styles.upperFlex}>
                    <div className={styles.total}>Total:</div>
                    <div className={styles.total}>Unresolved:</div>
                    <div className={styles.total}>Resolved:</div>
                </div>
                <div>
                    {this._renderTimeline()}
                </div>
                <div className={styles.viewBtn}>
                    <ButtonBase className={styles.viewMore}>View All</ButtonBase>
                </div>
            </div>
        )
    }
}

export default Queries

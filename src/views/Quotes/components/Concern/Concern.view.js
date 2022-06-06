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
                        <div className={styles.heading}>Looking For</div>
                        <div className={styles.desc}>{data.looking_for}</div>
                    </div>
                    <div>
                        <div className={styles.heading}>Quantity</div>
                        <div className={styles.desc}>{data.qty} {data.unit}</div>
                    </div>
                    <div>
                        <div className={styles.heading}>Location</div>
                        <div className={styles.desc}>{data.location}</div>
                    </div>
                    <div>
                        <div className={styles.heading}>Category</div>
                        <div className={styles.desc}>{data.category.name} {data.industry_name}</div>
                    </div>
                    <div>
                        <div className={styles.heading}>Description</div>
                        <div className={styles.desc}>{data.requirements}</div>
                    </div>
                    <div className={styles.preferenceFlex}>
                        <div>
                            <div className={styles.heading}>Preference</div>
                            <div className={styles.desc}>{data.preference}</div>
                        </div>
                        <div>
                            <div className={styles.heading}>Preference Time</div>
                            <div className={styles.desc}>{data.preferred_time}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Concern

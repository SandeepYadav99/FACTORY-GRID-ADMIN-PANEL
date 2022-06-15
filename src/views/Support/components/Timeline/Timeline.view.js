import React, {Component} from 'react';
import styles from './Style.module.css'
import {serviceGetSupportTimeline} from "../../../../services/Support.service";
import EventEmitter from "../../../../libs/Events.utils";
import {WaitingComponent} from "../../../../components/index.component";
import Constants from '../../../../config/constants'

class Timeline extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isCalling: true,
            timeline: [],
        }
    }

    async componentDidMount() {
        const {id} = this.props;
        const req = await serviceGetSupportTimeline({support_id:id});
        this.setState({
            isCalling: false,
        });
        if (!req.error) {
            this.setState({
                timeline: req.data.timeline,
            });
        } else {
            EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Timeline Not Found', type: 'error'});
        }
    }

    _renderTimeline(){
        const {timeline} = this.state;
        if(timeline.length == 0){
            return (<div className={styles.noTimeline}>No timeline updates</div>)
        }
        return timeline.map((val) => {
            return(
                <div>
                    <div className={styles.timelineFlex}>
                        <div className={styles.date}>
                            {val.createdAtMonth}
                        </div>
                        <div className={styles.totalTimeline}>
                            <div className={styles.weight}>{val.createdAtText}</div>
                            <div className={styles.weight}>{val.title ? val.title : 'Status Changed'}</div>
                            <div>Status: <span className={styles.error}>{Constants.SUPPORT_STATUS_TEXT[val.status]}</span></div>
                            <div>Priority: <span className={styles.priority}>{val.priority.toLowerCase()}</span></div>
                            <div>User: {val.user.name ? val.user.name : 'N/A'}</div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        const {data, isCalling} = this.state;
        if (isCalling) {
            return (<WaitingComponent/>);
        }
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

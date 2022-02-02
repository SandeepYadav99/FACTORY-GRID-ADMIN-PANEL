import React, {Component} from 'react';
import styles from './styles.module.css'
import SupportProfile from "./components/Profile/Profile.view";
import Timeline from "./components/Timeline/Timeline.view";
import Concern from "./components/Concern/Concern.view";
import Note from "./components/Note/Note.view"

class Support extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div>
                <div className={styles.upperFlex}>
                    <div className={styles.left}>
                        <SupportProfile/>
                        <br/>
                        <Timeline/>
                    </div>

                    <div className={styles.right}>

                        <div className={styles.plain}>
                            <div className={styles.caseFlex}>
                                <div>
                                    <div>Case ID:</div>
                                    <div className={styles.weight}>CA/2021/AA212</div>
                                </div>
                                <div>
                                    <div>Created On</div>
                                    <div className={styles.weight}>12/12/2021</div>
                                </div>
                                <div>
                                    <div>Updated On</div>
                                    <div className={styles.weight}>12/12/2021</div>
                                </div>
                            </div>
                        </div>
                        <br/>

                        <Concern/>
                        <br/>
                        <Note/>

                    </div>
                </div>
            </div>
        )
    }
}

export default Support

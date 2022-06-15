import React, {Component} from 'react';
import styles from './styles.module.css'
import LeadDetail from "./components/LeadDetail/LeadDetail.component";
import Timeline from "./components/Timeline/Timeline.view";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionGetSupportDetails, actionGetSupportNotes} from "../../actions/Support.action";
import LeadNoteList from "./components/Note/NoteList.component";
import Concern from "./components/Concern/Concern.view";
import {WaitingComponent} from "../../components/index.component";
import {ButtonBase} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../libs/history.utils";

class Support extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const {actionGetSupportDetails, actionGetSupportNotes} = this.props;
        actionGetSupportDetails(id);
        actionGetSupportNotes(id);
    }

    _renderUpperCase(){
        const {is_support_detail,support_detail} = this.props;
        if(is_support_detail || support_detail === null){
            return <WaitingComponent/>
        }
        return (
            <div className={styles.caseFlex}>
                <div>
                    <div>Case ID:</div>
                    <div className={styles.weight}>{support_detail.support_no}</div>
                </div>
                <div>
                    <div>Created On</div>
                    <div className={styles.weight}>{support_detail.createdAtText}</div>
                </div>
                <div>
                    <div>Updated On</div>
                    <div className={styles.weight}>{support_detail.updatedAtText}</div>
                </div>
            </div>
        )
    }

    render() {
        const {id} = this.props.match.params;
        const {is_support_detail,support_detail} = this.props;
        return(
            <div>
                <div>
                    <ButtonBase onClick={() => (history.goBack())}>
                        <ArrowBackIosIcon fontSize={'small'} className={styles.backArrow}/>
                    </ButtonBase>
                    <strong>Support List</strong>
                </div>
                <div className={styles.upperFlex}>
                    <div className={styles.left}>
                        <LeadDetail/>
                        <br/>
                        <Timeline id={id}/>
                    </div>


                    <div className={styles.right}>
                        <div className={styles.plain}>
                            {this._renderUpperCase()}
                        </div>
                        <br/>
                        <div>
                            <Concern data={support_detail} isfetching={is_support_detail}/>
                        </div>
                        <div>
                            <LeadNoteList/>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        support_detail: state.support.support_detail,
        is_support_detail: state.support.is_support_detail,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionGetSupportDetails: actionGetSupportDetails,
        actionGetSupportNotes: actionGetSupportNotes,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Support);

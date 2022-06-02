import React, {Component} from 'react';
import styles from './Style.module.css'
import LeadDetail from "./components/LeadDetail/LeadDetail.component";
import Timeline from "./components/Timeline/Timeline.view";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionGetQuoteDetails, actionGetQuoteNotes} from "../../actions/Quotes.action";
import LeadNoteList from "./components/Note/NoteList.component";
import Concern from "./components/Concern/Concern.view";
import {WaitingComponent} from "../../components/index.component";

class Lead extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const {actionGetQuoteDetails, actionGetQuoteNotes} = this.props;
        actionGetQuoteDetails(id);
        actionGetQuoteNotes(id);
    }

    _renderUpperCase(){
        const {is_quote_detail,quote_detail} = this.props;
        if(is_quote_detail || quote_detail === null){
            return <WaitingComponent/>
        }
        return (
            <div className={styles.caseFlex}>
                <div>
                    <div>Case ID:</div>
                    <div className={styles.weight}>{quote_detail.quote_no}</div>
                </div>
                <div>
                    <div>Created On</div>
                    <div className={styles.weight}>{quote_detail.createdAtText}</div>
                </div>
                <div>
                    <div>Updated On</div>
                    <div className={styles.weight}>{quote_detail.updatedAtText}</div>
                </div>
            </div>
        )
    }

    render() {
        const {is_quote_detail,quote_detail} = this.props;
        return(
            <div>
                <div className={styles.upperFlex}>
                    <div className={styles.left}>
                        <LeadDetail/>
                        <br/>
                        <Timeline/>
                    </div>


                    <div className={styles.right}>
                        <div className={styles.plain}>
                            {this._renderUpperCase()}
                        </div>
                        <br/>
                        <div>
                            <Concern data={quote_detail} isfetching={is_quote_detail}/>
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
        quote_detail: state.quotes.quote_detail,
        is_quote_detail: state.quotes.is_quote_detail,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionGetQuoteDetails: actionGetQuoteDetails,
        actionGetQuoteNotes: actionGetQuoteNotes,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Lead);

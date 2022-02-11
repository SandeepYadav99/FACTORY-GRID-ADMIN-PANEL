import React, {Component} from 'react';
import styles from './Style.module.css';
import {ButtonBase, IconButton} from "@material-ui/core";
import {AddCircleOutline, ControlPointRounded,Edit} from "@material-ui/icons";
import csx from 'classnames';
import QuestionsView from "../Questions/Questions.view";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import TopicForm from './TopicForm.view'
import {bindActionCreators} from "redux";
import {
    actionChangeStatusFaq, actionCreateFaq, actionDeleteFaq,
    actionFetchFaq,
    actionFilterFaq,
    actionResetFilterFaq,
    actionSetPageFaq, actionUpdateFaq
} from "../../../../actions/Faq.action";
import {connect} from "react-redux";

class TopicView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            side_panel: false,
            edit_data: null,
        };
        //this.list = ['Topic Question 1 can be there in 2 lines at max after which it will be truncated','Topic Question 1 can be there in 2 lines at max after which it will be truncated']
        this._handleAddTopic = this._handleAddTopic.bind(this);
        this._handleSideToggle = this._handleSideToggle.bind(this);
        this._handleDataSave = this._handleDataSave.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
    }

    componentDidMount() {
        // if (this.props.total_count <= 0) {
        this.props.actionFetchData();
        if (this.props.data.length > 0) {
            this.props.handleCategoryChange(this.props.data[0])
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.data.length !== this.props.data.length){
            this.props.handleCategoryChange(this.props.data[0])
        }
    }

    _handleChangeType(index,val){
        this.setState({
            active: index
        })
        this.props.handleCategoryChange(val)
    }

    _handleEdit(data) {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: data,
        })
        this.props.handleCategoryChange(data)
    }

    _renderList(){
        const {active} = this.state;
        const {data, selectedCategory} = this.props
        if(data.length > 0){
            return data.map((val,index) => {
                return (
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <ButtonBase className={(selectedCategory && val.id === selectedCategory.id) ? csx(styles.selected,styles.active) : csx(styles.notSelected)} onClick={this._handleChangeType.bind(this,index,val)}>
                                <span>{val.title}</span>
                            </ButtonBase>
                            <IconButton onClick={this._handleEdit.bind(this, val)}>
                                <Edit color={'primary'} fontSize={'small'}/>
                            </IconButton>
                        </li>
                        <hr className={styles.line}/>
                    </ul>
                )
            })
        }
    }


    _handleAddTopic(type){
        this.props.handleSideToggle(type);
    }

    _renderCreateForm () {
        if (this.state.side_panel) {
            return (<TopicForm handleDataSave={this._handleDataSave}
                               data={this.state.edit_data}
                               handleDelete={this._handleDelete}
            />)
        }
    }

    _handleDelete(id) {
        this.props.actionDelete(id);
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _handleSideToggle() {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null
        });
    }

    _handleDataSave(data, type) {
        // this.props.actionChangeStatus({...data, type: type});
        if (type == 'CREATE') {
            this.props.actionCreateFaq(data)
        } else {
            this.props.actionUpdateFaq(data)
        }
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    render() {
        return(
            <div>
                <div className={styles.plainBg}>
                    <div className={styles.upperFlex}>
                        <div className={styles.title}>Browse By Topic</div>
                        <div>
                            <IconButton
                                onClick={this._handleSideToggle}
                            >
                                <AddCircleOutline color={'primary'}/>
                            </IconButton>
                        </div>
                    </div>

                    <div>
                        {this._renderList()}
                    </div>
                </div>

                <SidePanelComponent
                    handleToggle={this._handleSideToggle}
                    title={'Add/Manage FAQ'} open={this.state.side_panel} side={'right'}>
                    {this._renderCreateForm()}
                </SidePanelComponent>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.faq.present,
        total_count: state.faq.all.length,
        currentPage: state.faq.currentPage,
        serverPage: state.faq.serverPage,
        sorting_data: state.faq.sorting_data,
        is_fetching: state.faq.is_fetching,
        query: state.faq.query,
        query_data: state.faq.query_data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionFetchData: actionFetchFaq,
        actionSetPage: actionSetPageFaq,
        actionResetFilter: actionResetFilterFaq,
        actionSetFilter: actionFilterFaq,
        actionChangeStatus: actionChangeStatusFaq,
        actionCreateFaq: actionCreateFaq,
        actionUpdateFaq: actionUpdateFaq,
        actionDelete: actionDeleteFaq
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicView)

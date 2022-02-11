/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component} from 'react';
import {Button, Paper} from '@material-ui/core';

import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    red as redColor,
} from '@material-ui/core/colors';
import { Add } from '@material-ui/icons';
import PageBox from '../../../src/components/PageBox/PageBox.component';
import SidePanelComponent from '../../../src/components/SidePanel/SidePanel.component';
// import CreateProvider from './Create.container';
import styles from './Faq.module.css';
// import DataTables from '../../Datatables/DataTableSrc/DataTables';
import DataTables from '../../../src/Datatables/Datatable.table';
import Constants from '../../../src/config/constants';
import FilterComponent from '../../../src/components/Filter/Filter.component';
import {
    actionFetchBlogs,
    actionChangePageBlogs,
    actionChangeStatusBlogs,
    actionFilterBlogs,
    actionResetFilterBlogs,
    actionSetPageBlogs,
    actionCreateBlogs,
    actionUpdateBlogs, actionDeleteBlogs
} from '../../actions/Blogs.action';
import TopicView from "./components/Topic/Topic.view";
import QuestionView from "./components/Questions/QuestionView";


let CreateProvider = null;
class FaqList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogState: false,
            point_selected: null,
            data: [],
            page: 1,
            total: Constants.DEFAULT_PAGE_VALUE + 1,
            side_panel: false,
            edit_data: null,
            tour_types:[],
            cities:[],
            anchorEl: null,
            open: false,
            faq_type: '',
            selectedCategory: null
        };
        this.configFilter = [
            // {label: 'Country', name: 'country', type: 'text'},
            {label: 'City', name: 'city', type: 'text'},
            {label: 'Request Date', name: 'createdAt', type: 'date'},
            {label: 'Status', name: 'status', type: 'select', fields: ['PENDING', 'ACTIVE']},
        ];

        this._handleFilterDataChange = this._handleFilterDataChange.bind(this);
        this._queryFilter = this._queryFilter.bind(this);
        this._handleSearchValueChange = this._handleSearchValueChange.bind(this);
        this._handleSideToggle = this._handleSideToggle.bind(this);
        this._handleSortOrderChange = this._handleSortOrderChange.bind(this);
        this._handleRowSize = this._handleRowSize.bind(this);
        this._handlePageChange = this._handlePageChange.bind(this);
        this._handleEdit = this._handleEdit.bind(this);
        this._handleChangeStatus = this._handleChangeStatus.bind(this);
        this._handleDataSave = this._handleDataSave.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this._handleCategoryChange = this._handleCategoryChange.bind(this);
    }

    componentDidMount() {
        // if (this.props.total_count <= 0) {
        //this.props.actionFetchData();

    }


    handleCellClick(rowIndex, columnIndex, row, column) {
        console.log(`handleCellClick rowIndex: ${rowIndex} columnIndex: ${columnIndex}`);
    }

    _handlePageChange(type) {
        console.log('_handlePageChange', type);
        this.props.actionSetPage(type);
    }


    _queryFilter(key, value) {
        console.log('_queryFilter', key, value);
        // this.props.actionSetPage(1);
        this.props.actionFetchData(1, this.props.sorting_data, {
            query: key == 'SEARCH_TEXT' ? value : this.props.query,
            query_data: key == 'FILTER_DATA' ? value : this.props.query_data,
        }, true);
    }

    _handleFilterDataChange(value) {
        console.log('_handleFilterDataChange', value);
        this._queryFilter('FILTER_DATA', value);
    }

    _handleSearchValueChange(value) {
        console.log('_handleSearchValueChange', value);
        this._queryFilter('SEARCH_TEXT', value);
    }

    handlePreviousPageClick() {
        console.log('handlePreviousPageClick', 'PREV');
    }

    handleNextPageClick() {
        console.log('handleNextPageClick', 'NEXT');
    }

    _handleSortOrderChange(row, order) {
        console.log(`handleSortOrderChange key:${row} order: ${order}`);
        // this.props.actionSetPage(1);
        this.props.actionFetchData(1,
            {row, order}, {
                query: this.props.query,
                query_data: this.props.query_data,
            }, row);
        // this.props.fetchUsers(1, row, order, { query: this.props.query, query_data: this.props.query_data });
    }

    _handleRowSize(page) {
        console.log(page);
    }

    renderStatus(status) {
        if (status === 'ACTIVE') {
            return (
                <span style={{
                    fontSize: '12px',
                    color: '#20c997',
                    background: 'rgba(32,201,151,.1)',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    textTransform: 'capitalize'
                }}>
                    {(status)}
                </span>
            );
        }
        return (<span style={{
            ...styles.spanFont,
            fontSize: '12px',
            color: '#fa8b0c',
            background: `${status == 'NEW' ? 'rgba(250,139,12,.1)' : 'rgba(250,139,12,.1)'}`,
            padding: '3px 10px',
            borderRadius: '20px',
            textTransform: 'capitalize'
        }}>{(status)}</span>);
    }


    renderFirstCell(user) {
        const tempEmailRender = user.email ? (<span style={{textTransform: 'lowercase'}}>{(user.email)}</span>) : null;
        return (
            <div className={'userDetailLeague'} title={user.otp}>
                <div className={classNames('userDetailLeagueText', 'openSans')}>
                    <span><strong>{user.name}</strong></span> <br/>
                    {tempEmailRender}
                </div>
            </div>
        );
    }


    _handleEdit(data) {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: data,
        })
    }

    _handleSideToggle(type) {
        // console.log(type)
        this.setState({
            side_panel: !this.state.side_panel,
            //faq_type: type
        });
    }

    _handleDelete(id) {
        this.props.actionDelete(id);
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _handleCategoryChange(category) {
        this.setState({
            selectedCategory: category
        })
    }

    _renderCreateForm () {
        if (CreateProvider == null) {
            // import CreateProvider from './Create.container';
            CreateProvider = require('./Faq.view').default;
        }
        if (this.state.side_panel) {
            return (<CreateProvider
                data={this.state.edit_data}
                cities={this.state.cities}
                tour_types = {this.state.tour_types}
                handleDataSave={this._handleDataSave}
                handleDelete={this._handleDelete}
                faq_type = {this.state.faq_type}
            ></CreateProvider>);
        } return null;
    }

    _handleChangeStatus(data, type) {
        this.props.actionChangeStatus({...data, type: type});
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _handleDataSave(data, type) {
        // this.props.actionChangeStatus({...data, type: type});

        if (type == 'CREATE') {
            this.props.actionCreateBlogs(data)
        } else {
            this.props.actionUpdateBlogs(data)
        }
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    handleClick(event){
        console.log('event', event.currentTarget);
        this.setState({
            anchorEl: event.currentTarget,
            open: true
        })
    }

    handleClose(){
        this.setState({
            anchorEl: null,
            open: false,
        })
    }

    render() {
        const {selectedCategory} = this.state;
        return (
            <div>
                {/*<PageBox>*/}
                    <div className={styles.headerContainer}>
                        <span className={styles.title}>Frequently Asked Questions</span>
                        <Button
                            // onClick={this._handleSideToggle}
                            variant={'contained'} color={'primary'}>
                            View Page
                        </Button>
                    </div>
                {/*</PageBox>*/}


                <div className={styles.outerFlex}>
                    <div className={styles.left}>
                        <TopicView
                            selectedCategory={selectedCategory}
                             handleCategoryChange={this._handleCategoryChange}
                        />
                    </div>
                    <div className={styles.right}>
                        <QuestionView
                             category={selectedCategory}
                        />
                    </div>
                </div>

                {/*<SidePanelComponent*/}
                {/*    handleToggle={this._handleSideToggle}*/}
                {/*    title={'Add/Manage FAQ Topic'} open={this.state.side_panel} side={'right'}>*/}
                {/*    {this._renderCreateForm()}*/}
                {/*</SidePanelComponent>*/}

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FaqList);

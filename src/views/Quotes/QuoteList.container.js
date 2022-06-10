/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component} from 'react';
import {Button, ButtonBase, capitalize, IconButton, Paper} from '@material-ui/core';

import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    red as redColor,
} from '@material-ui/core/colors';
import {Add, RemoveRedEyeOutlined as ViewIcon} from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
import SidePanelComponent from '../../components/SidePanel/SidePanel.component';
// import CreateProvider from './Create.container';
import styles from './Style.module.css';
import DataTables from '../../Datatables/Datatable.table';
import Constants from '../../config/constants';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import FilterComponent from '../../components/Filter/Filter.component';
import {
    actionFetchQuotes,
    actionChangePageQuotes,
    actionFilterQuotes,
    actionResetFilterQuotes,
    actionSetPageQuotes,
    actionSetQuoteRequestType
} from '../../actions/Quotes.action';
import {serviceGetQuoteUsers} from "../../services/Quotes.service";
import csx from "classnames";

let CreateProvider = null;

class QuotessList extends Component {
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
            selectedTourIndex: null,
            selected: 'ALL',
        };
        const temp = Object.keys(Constants.QUOTE_STATUS_TEXT).map((key) => {
            return {
                id: key,
                name: Constants.QUOTE_STATUS_TEXT[key],
            };
        })
        this.configFilter = [
            // {label: 'Created Date', options:{maxDate: new Date()}, name: 'createdAt', type: 'date'},
            {
                label: 'Status',
                name: 'status',
                type: 'selectObject',
                custom: {extract: {id: 'id', title: 'name'}},
                fields: temp
            },
            {label: 'Priority', name: 'priority', type: 'select', fields: ['HIGH','MEDIUM','LOW']},
            {label: 'Assigned To', name: 'assigned_to', type: 'selectObject', custom: { extract: { id: 'id', title: 'title' } } , fields: []},
        ];

        this._handleFilterDataChange = this._handleFilterDataChange.bind(this);
        this._queryFilter = this._queryFilter.bind(this);
        this._handleSearchValueChange = this._handleSearchValueChange.bind(this);
        this._handleSideToggle = this._handleSideToggle.bind(this);
        this._handleSortOrderChange = this._handleSortOrderChange.bind(this);
        this._handleRowSize = this._handleRowSize.bind(this);
        this._handlePageChange = this._handlePageChange.bind(this);
        this._handleEdit = this._handleEdit.bind(this);
        this._handleStatusChange = this._handleStatusChange.bind(this);
    }

    componentDidMount() {
        // if (this.props.total_count <= 0) {
            this.props.actionFetchData();
        // }

        const req =  serviceGetQuoteUsers({});
        req.then((data)=> {
            if(!data.error){
                // this.setState({
                //     listData: data.data,
                //     is_calling: false
                // });
                this.configFilter[2].fields = data.data;
            }
        });
    }


    handleCellClick(rowIndex, columnIndex, row, column) {
        console.log(`handleCellClick rowIndex: ${rowIndex} columnIndex: ${columnIndex}`);
    }

    _handlePageChange(type) {
        console.log('_handlePageChange', type);
        this.props.actionSetPage(type);
    }


    _handleStatusChange(data, type) {
        // this.props.actionChangeStatus({id: data, type: type});
        // if (type == 'CREATE') {
        //     this.props.actionCreate(data)
        // } else {
        //     this.props.actionUpdate(data)
        // }
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
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
        let className = 'warning';
        if (status in Constants.QUOTE_STATUS_COLOR) {
            className = Constants.QUOTE_STATUS_COLOR[status];
        }
        return (<span className={csx('status', className)}>{(status.replaceAll('_', ' '))}</span>);
    }

    renderFirstCell(user) {
        // const tempEmailRender = user.email ? (<span style={{textTransform: 'lowercase'}}>{(user.email)}</span>) : null;
        return (
            <div className={'userDetailLeague'} title={user.otp}>
                <div className={classNames('userDetailLeagueText', 'openSans')}>
                    <span><strong>{`${user.name}`}</strong></span> <br/>
                    {/*{tempEmailRender}*/}
                </div>
            </div>
        );
    }


    _handleEdit(data) {
       this.props.history.push('/quotes/detail/' + data.quote_id)
    }

    _handleSideToggle() {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
            selectedTourIndex: null
        });
    }

    _renderCreateForm () {
        if (CreateProvider == null) {
            // import CreateProvider from './Create.container';
            CreateProvider = require('./Quote.view').default;
        }
        if (this.state.side_panel) {
            return (<CreateProvider changeStatus={this._handleStatusChange} data={this.state.edit_data}></CreateProvider>);
        } return null;
    }

    _renderUserInfo (data) {
        return (
            <>
                <span className={styles.weight}>{data.user.name}</span> <br/>
                <span>{data.user.email}</span> <br/>
                <span>{data.user.contact}</span>
            </>
        )
    }

    _renderQueryInfo(data){
        return (
            <>
                <div className={csx('status', data.priority)}>{Constants.PRIORITY_TEXT[data.priority]}</div>
                <div className={styles.iconFlex}>
                    <LocationOnOutlinedIcon className={styles.clock}/><span className={styles.greyColor}>{data.location}</span>
                </div>
                <div className={styles.iconFlex}>
                    <ScheduleOutlinedIcon className={styles.clock}/><span className={styles.greyColor}>{data.preference.toLowerCase() + ' Preference'}</span>
                </div>
                <div className={styles.iconFlex}>
                    <LocalShippingOutlinedIcon className={styles.clock}/><span className={styles.greyColor}>{data.preferred_time.toLowerCase() + ' Delivery'}</span>
                </div>
            </>
        )
    }

    _handleSearchClick(status) {
        this.setState({
            selected: status
        }, () => {
            this.props.actionSetQuoteRequestType(status);
            this.props.actionFetchData(1, {}, {}, true, status);
        })
    }

    render() {
        const {selected} = this.state;
        const tableStructure = [
            {
                key: 'quote_no',
                label: 'ID',
                sortable: false,
                 style: { width: '10%'},
                render: (temp, all) => <div><div className={styles.weight}>{all.quote_no}</div><div>{all.createdAtText}</div></div>,
            },
            {
                key: 'name',
                label: 'Customer Detail',
                sortable: true,
                render: (temp, all) => <div>{this._renderUserInfo(all)}</div>,
            },
            {
                key: 'product',
                label: 'Product',
                sortable: false,
                render: (temp, all) => <div><div className={styles.weight}>{all.looking_for}</div><div>{all.qty} {all.unit}</div></div>,
            },
            {
                key: 'category',
                label: 'Category',
                sortable: false,
                render: (temp, all) => <div><div className={styles.weight}>{all.category.name}</div><div>{all.industry_name}</div></div>,
            },
            {
                key: 'query_info',
                label: 'Query Info',
                sortable: true,
                // style: { width: '40%'},
                render: (temp, all) => <div>{this._renderQueryInfo(all)}</div>,
            },
            {
                key: 'assigned_to',
                label: 'Assigned To',
                sortable: false,
                render: (temp, all) => <div><div className={styles.weight}>{all.assigned_data.name !== null ? all.assigned_data.name : 'Unassigned'}</div><div>{all.assigned_date ? all.assigned_date : 'N/A'}</div></div>,
            },
            {
                key: 'status',
                label: 'Status',
                sortable: true,
                render: (temp, all) => <div>{this.renderStatus(all.status)}</div>,
            },
            {
                key: 'updatedAt',
                label: 'Last Updated',
                sortable: true,
                render: (temp, all) => <div className={styles.weight}>{all.updatedAtText}</div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div><IconButton className={'tableActionBtn'} color='secondary' disabled={this.state.is_calling}
                                                         onClick={this._handleEdit.bind(this, all)}>
                    <ViewIcon fontSize={'small'} /></IconButton></div>),
            },


        ];
        const datatableFunctions = {
            onCellClick: this.handleCellClick,
            // onCellDoubleClick: this.handleCellDoubleClick,
            // onFilterValueChange: this._handleSearchValueChange.bind(this),
            onSortOrderChange: this._handleSortOrderChange,
            onPageChange: this._handlePageChange,
            onRowSelection: this.handleRowSelection,
            onRowSizeChange: this._handleRowSize,

        };
        const datatable = {
            ...Constants.DATATABLE_PROPERTIES,
            columns: tableStructure,
            data: this.props.data,
            count: this.props.total_count,
            page: this.props.currentPage,
        };
        return (
            <div>
                {/*<div className={styles.filterButtons}>*/}
                {/*    <ButtonBase onClick={this._handleSearchClick.bind(this, 'ALL')} style={{borderTopLeftRadius:'15px'}}*/}
                {/*                className={selected === 'ALL' ? styles.noColor : styles.color}>All</ButtonBase>*/}
                {/*    <ButtonBase onClick={this._handleSearchClick.bind(this, 'PENDING')}*/}
                {/*                className={selected === 'PENDING' ? styles.noColor : styles.color}>Pending</ButtonBase>*/}
                {/*    <ButtonBase onClick={this._handleSearchClick.bind(this, 'ON_GOING')}*/}
                {/*                className={selected === 'ON_GOING' ? styles.noColor : styles.color}>On Going</ButtonBase>*/}
                {/*    <ButtonBase onClick={this._handleSearchClick.bind(this, 'COMPLETED')} style={{borderTopRightRadius:'15px'}}*/}
                {/*                className={selected === 'COMPLETED' ? styles.noColor : styles.color}>Completed</ButtonBase>*/}
                {/*</div>*/}
                <PageBox>
                    <div className={styles.headerContainer}>
                        <span className={styles.title}>Quotes List</span>
                        {/*<Button onClick={this._handleSideToggle} variant={'contained'} color={'primary'}>*/}
                        {/*    <Add></Add> Create*/}
                        {/*</Button>*/}
                    </div>

                    <div>
                        <FilterComponent
                            is_progress={this.props.is_fetching}
                            filters={this.configFilter}
                            handleSearchValueChange={this._handleSearchValueChange.bind(this)}
                            handleFilterDataChange={this._handleFilterDataChange}
                        />
                        <div>
                            <br/>
                            <div style={{width: '100%'}}>
                                <DataTables
                                    {...datatable}
                                    {...datatableFunctions}
                                    selectedTourIndex={this.state.selectedTourIndex}
                                />
                            </div>
                        </div>
                    </div>

                </PageBox>
                <SidePanelComponent
                    handleToggle={this._handleSideToggle}
                    title={'Quotes Details'} open={this.state.side_panel} side={'right'}>
                    {this._renderCreateForm()}
                </SidePanelComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.quotes.present,
        total_count: state.quotes.all.length,
        currentPage: state.quotes.currentPage,
        serverPage: state.quotes.serverPage,
        sorting_data: state.quotes.sorting_data,
        is_fetching: state.quotes.is_fetching,
        query: state.quotes.query,
        query_data: state.quotes.query_data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionFetchData: actionFetchQuotes,
        actionSetPage: actionSetPageQuotes,
        actionResetFilter: actionResetFilterQuotes,
        actionSetFilter: actionFilterQuotes,
        actionSetQuoteRequestType: actionSetQuoteRequestType
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotessList);

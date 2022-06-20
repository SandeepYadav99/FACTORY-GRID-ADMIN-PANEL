/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component} from 'react';
import {Button, Paper, Checkbox, IconButton,ButtonBase} from '@material-ui/core';

import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    red as redColor,
} from '@material-ui/core/colors';
import {Add, InputRounded as EditIcon, RemoveRedEyeOutlined as ViewIcon} from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
import SidePanelComponent from '../../components/SidePanel/SidePanel.component';
// import CreateProvider from './Create.container';
import styles from './styles.module.css';
// import DataTables from '../../Datatables/DataTableSrc/DataTables';
import DataTables from '../../Datatables/Datatable.table';
import Constants from '../../config/constants';
import FilterComponent from '../../components/Filter/Filter.component';
import {BookmarkBorder, Bookmark, Check, Close,} from '@material-ui/icons';
import {
    actionFetchSupport,
    actionChangePageSupport,
    actionChangeStatusSupport,
    actionFilterSupport,
    actionResetFilterSupport,
    actionSetPageSupport,
    actionCreateSupport,
    actionUpdateSupport,
    // actionCleanSupport
} from '../../actions/Support.action';
import csx from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import {serviceGetQuoteUsers} from "../../services/Quotes.service";


let CreateProvider = null;

class SupportList extends Component {
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
            listData: null,
            is_submit: false,
            selected: [],
            batch_id: null,
            allSelected: false,
            driver_name: '',
            selection: 'ALL'
        };
        const temp = Object.keys(Constants.SUPPORT_STATUS_TEXT).map((key) => {
            return {
                id: key,
                name: Constants.SUPPORT_STATUS_TEXT[key],
            };
        })
        this.configFilter = [
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
        this._handleChangeStatus = this._handleChangeStatus.bind(this);
        this._handleDataSave = this._handleDataSave.bind(this);
        this._handleCheckbox = this._handleCheckbox.bind(this);
        this._handleSelectAll = this._handleSelectAll.bind(this);

    }

    componentDidMount() {
        this.props.actionFetchData();
        // const request = serviceGetCustomList(['STORES']);
        //
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
        if (status in Constants.SUPPORT_STATUS_TEXT) {
            className = Constants.SUPPORT_STATUS_TEXT[status];
        }
        return (<span className={csx('status', className)}>{(status.replaceAll('_', ' '))}</span>);
    }


    _handleEdit(data) {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: data,
        })
    }

    _handleSideToggle() {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _renderCreateForm() {
        if (CreateProvider == null) {
            // import CreateProvider from './Create.container';
            // CreateProvider = require('./Support.container').default;
        }
        if (this.state.side_panel) {
            const {id} = this.props.match.params;
            return (<CreateProvider data={this.state.edit_data}
                                    listData={this.state.listData}
                                    changeStatus={this._handleDataSave}></CreateProvider>);
        }
        return null;
    }

    _handleChangeStatus(data, type) {
        this.props.actionChangeStatus({...data, type: type});
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }


    async _handleDataSave(data, type) {
        this.setState({
            is_submit: true
        });
    }


    _handleCheckbox(id) {
        const tempSelected = this.state.selected;
        const tempIndex = tempSelected.indexOf(id);
        if (tempIndex >= 0) {
            tempSelected.splice(tempIndex, 1);
        } else {
            tempSelected.push(id);
        }
        this.setState({
            selected: tempSelected,
            allSelected: false,
        });
    }

    _renderMenu() {
        const {batches} = this.props;
        return batches.map((val) => {
            return (<MenuItem value={val.id}>{val.name} - {val.delivery_slot.unformatted}</MenuItem>);
        })
    }

    _handleSelectAll() {
        const {data} = this.props;
        const {allSelected} = this.state;
        if (allSelected) {
            this.setState({
                selected: [],
                allSelected: false
            });
        } else {
            const temp = [];
            data.forEach((val) => {
                if (val.status == Constants.JOB_STATUS.NOT_ASSIGNED) {
                    temp.push(val.id);
                }
            });
            this.setState({
                selected: temp,
                allSelected: true
            });
        }
    }


    ccyFormat(num) {
        return `${Constants.CURRENCY} ${num.toFixed(2)}`;
    }

    _renderProducts(products) {
        return products.map((val) => {
            return (<div className={styles.productInfo}>
                <span className={styles.productName}>{val.name}</span>
                <span
                    className={styles.productQty}> {parseFloat(val.quantity * val.unit_step).toFixed(2)} {val.unit}</span>
            </div>)
        })
    }

    _renderCell(user){
        return(
            <div>
                <div className={styles.caseId}>{user.name}</div>
                <div className={styles.mobileFlex}>
                    {/*<img src={require('../../assets/img/varified_icon.png')} alt="" height={12}/>*/}
                    <div className={styles.mob}>{user.contact}</div>
                </div>
                <div className={styles.mobileFlex}>
                    {/*<img src={require('../../assets/img/varified_icon.png')} alt="" height={12}/>*/}
                    <div className={styles.mob} style={{textTransform:'lowercase'}}>{user.email}</div>
                </div>
            </div>
        )
    }

    _handleViewSupport(data){
        this.props.history.push('/support/detail/' + data.support_id)
    }

    _handleSearchClick(type) {
        this.setState({
            selection: type
        })
    }


    render() {
        const {selection} = this.state;
        const tableStructure = [
            {
                key: 'support_no',
                label: 'Case ID',
                sortable: true,
                style: { width: '10%'},
                render: (temp, all) => <div><div className={styles.weight}>{all.support_no}</div><div>{all.createdAtText}</div></div>,
            },
            {
                key: 'customer',
                label: 'Customer Detail',
                sortable: false,
                style: {width: '15%'},
                render: (temp, all) => <div >{this._renderCell(all)}</div>,
            },
            {
                key: 'concern',
                label: 'Concern',
                sortable: false,
                // style: { width: '20%'},
                render: (temp, all) => <div><div className={styles.caseId}>{Constants.CONCERN_STATUS_TEXT[all.concern]}</div></div>,
            },
            {
                key: 'assigned_to',
                label: 'Assigned To',
                sortable: false,
                // style: { width: '20%'},
                render: (temp, all) => <div><div className={all.assigned_data.name !== null ? styles.weight : styles.unassigned}>{all.assigned_data.name !== null ? all.assigned_data.name : 'Unassigned'}</div><div>{all.assigned_date ? all.assigned_date : 'N/A'}</div></div>,
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
                key: 'priority',
                label: 'Priority',
                sortable: false,
                render: (temp, all) => <div><div className={styles.error}>{all.priority}</div></div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div>
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={this.state.is_calling}
                                onClick={this._handleViewSupport.bind(this, all)}
                    >
                        <ViewIcon fontSize={'small'} /></IconButton >
                </div>),
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
            handleSelectAllClick: this._handleSelectAll

        };
        const datatable = {
            ...Constants.DATATABLE_PROPERTIES,
            columns: tableStructure,
            data: this.props.data,
            count: this.props.total_count,
            page: this.props.currentPage,
            showSelection: false,
            allRowSelected: this.state.allSelected
        };
        return (
            <div>
                {/*<div className={styles.filterButtons}>*/}
                {/*    <ButtonBase onClick={this._handleSearchClick.bind(this, 'ALL')}  style={{borderTopLeftRadius:'15px'}}*/}
                {/*                className={selection === 'ALL' ? styles.noColor : styles.color}>All (400)</ButtonBase>*/}
                {/*    <ButtonBase onClick={this._handleSearchClick.bind(this, 'PENDING')}*/}
                {/*                className={selection === 'PENDING' ? styles.noColor : styles.color}>Pending (200)</ButtonBase>*/}
                {/*    <ButtonBase onClick={this._handleSearchClick.bind(this, 'ONGOING')}*/}
                {/*                className={selection === 'ONGOING' ? styles.noColor : styles.color}>On-going (100)</ButtonBase>*/}
                {/*    <ButtonBase onClick={this._handleSearchClick.bind(this, 'RESOLVED')} style={{borderTopRightRadius:'15px'}}*/}
                {/*                className={selection === 'RESOLVED' ? styles.noColor : styles.color}>Resolved (100)</ButtonBase>*/}
                {/*</div>*/}
                <PageBox>
                    <div className={styles.headerContainer}>
                        <span className={styles.title}>Customer Support List</span>
                    </div>

                    <div>
                        <FilterComponent
                            is_progress={this.props.is_fetching}
                            filters={this.configFilter}
                            handleSearchValueChange={this._handleSearchValueChange.bind(this)}
                            handleFilterDataChange={this._handleFilterDataChange}
                        />
                        <div>

                            <div style={{width: '100%'}}>
                                <DataTables
                                    {...datatable}
                                    {...datatableFunctions}
                                />
                            </div>
                        </div>
                    </div>

                </PageBox>
                <SidePanelComponent
                    handleToggle={this._handleSideToggle}
                    title={'Support'} open={this.state.side_panel} side={'right'}>
                    {this._renderCreateForm()}
                </SidePanelComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.support.present,
        total_count: state.support.all.length,
        currentPage: state.support.currentPage,
        serverPage: state.support.serverPage,
        sorting_data: state.support.sorting_data,
        is_fetching: state.support.is_fetching,
        query: state.support.query,
        query_data: state.support.query_data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionFetchData: actionFetchSupport,
        actionSetPage: actionSetPageSupport,
        actionResetFilter: actionResetFilterSupport,
        actionSetFilter: actionFilterSupport,
        actionChangeStatus: actionChangeStatusSupport,
        actionCreate: actionCreateSupport,
        actionUpdate: actionUpdateSupport,
        // actionCleanSupport: actionCleanSupport
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportList);

/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component} from 'react';
import {Button, Paper,ButtonBase} from '@material-ui/core';

import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    red as redColor,
} from '@material-ui/core/colors';
    // import {Add} from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
import SidePanelComponent from '../../components/SidePanel/SidePanel.component';
// import CreateProvider from './Create.container';
import styles from './Style.module.css';
import { Add,KeyboardArrowLeft } from '@material-ui/icons';
// import DataTables from '../../Datatables/DataTableSrc/DataTables';
import DataTables from '../../Datatables/Datatable.table';
import Constants from '../../config/constants';
import FilterComponent from '../../components/Filter/Filter.component';
import {
    actionFetchSubCategory,
    actionChangePageSubCategory,
    actionChangeStatusSubCategory,
    actionFilterSubCategory,
    actionResetFilterSubCategory,
    actionSetPageSubCategory,
    actionCreateSubCategory,
    actionUpdateSubCategory,
    actionDeleteSubCategory
} from '../../actions/SubCategory.action';
import {serviceGetIndustryList} from "../../services/Industry.service";
import {serviceGetTypeList} from "../../services/Type.service";

let CreateProvider = null;

class SubCategoryList extends Component {
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
            is_calling: true,
            listData: null,
            types: []
        };
        this.configFilter = [
            // {label: 'Created On', name: 'createdAt', type: 'date'},
            {label: 'Status', name: 'status', type: 'select', fields: ['INACTIVE', 'ACTIVE']},
            // {label: 'Categories', name: 'ref_id', type: 'selectObject', custom: { extract: { id: 'id', title: 'name' } } , fields: []},
            // {label: 'Tag', name: 'tag', type: 'select', fields: ['GENERAL', 'FEATURED', 'OFFER']},
            // {label: 'Type', name: 'type', type: 'select', fields: ['GENERAL', 'CATEGORY']},
        ];

        this._handleFilterDataChange = this._handleFilterDataChange.bind(this);
        this._queryFilter = this._queryFilter.bind(this);
        this._handleSearchValueChange = this._handleSearchValueChange.bind(this);
        this._handleSideToggle = this._handleSideToggle.bind(this);
        this._handleSortOrderChange = this._handleSortOrderChange.bind(this);
        this._handleRowSize = this._handleRowSize.bind(this);
        this._handlePageChange = this._handlePageChange.bind(this);
        this._handleEdit = this._handleEdit.bind(this);
        this._handleDataSave = this._handleDataSave.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleBack = this._handleBack.bind(this);
    }

    componentDidMount() {
        // if (this.props.total_count <= 0) {
        this.props.actionFetchData();
        const request = serviceGetTypeList();
        request.then((data)=> {
            if(!data.error){
                this.setState({
                    types: data.data
                })
                //this.configFilter[2].fields = data.data;
            }
        })
        // }
    }


    handleCellClick(rowIndex, columnIndex, row, column) {
        console.log(`handleCellClick rowIndex: ${rowIndex} columnIndex: ${columnIndex}`);
    }

    _handlePageChange(type) {
        console.log('_handlePageChange', type);
        this.props.actionSetPage(type);
    }


    _handleDataSave(data, type) {
        // this.props.actionChangeStatus({...data, type: type});
        if (type == 'CREATE') {
            this.props.actionCreateSubCategory(data)
        } else {
            this.props.actionUpdateSubCategory(data)
        }
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _queryFilter(key, value) {
        console.log('_queryFilter', key, value);
            this.props.actionSetPage(1);
        this.props.actionFetchData(1, this.props.sorting_data, {
            query: key == 'SEARCH_TEXT' ? value : this.props.query,
            query_data: key == 'FILTER_DATA' ? value : this.props.query_data,
        });
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
        this.props.actionSetPage(1);
        this.props.actionFetchData(1,
            {row, order}, {
                query: this.props.query,
                query_data: this.props.query_data,
            });
        // this.props.fetchUsers(1, row, order, { query: this.props.query, query_data: this.props.query_data });
    }

    _handleRowSize(page) {
        console.log(page);
    }

    _handleBack() {
        this.props.history.goBack()
        // this.props.history.push('/industry');
    }

    _handleSubCategories(data) {
        // this.props.history.push('subcategory');
    }


    // renderStatus(status) {
    //     if (status === 'ACTIVE') {
    //         return (
    //             <span style={{
    //                 fontSize: '12px',
    //                 color: 'white',
    //                 background: 'green',
    //                 padding: '3px 10px',
    //                 borderRadius: '20px',
    //                 textTransform: 'capitalize'
    //             }}>
    //                 {(status)}
    //             </span>
    //         );
    //     }
    //     return (<span style={{
    //         ...styles.spanFont,
    //         fontSize: '12px',
    //         color: 'white',
    //         background: `${status == 'NEW' ? 'orange' : 'orange'}`,
    //         padding: '3px 10px',
    //         borderRadius: '20px',
    //         textTransform: 'capitalize'
    //     }}>{(status)}</span>);
    // }

    renderStatus(status) {
        let className = 'warning';
        if (status in Constants.STATUS) {
            className = Constants.STATUS[status];
        }
        return (<span className={classNames('status', className)}>{(status)}</span>);
    }

    renderFirstCell(user) {
        const tempEmailRender = user.email ? (<span style={{textTransform: 'lowercase'}}>{(user.email)}</span>) : null;
        return (
            <div className={styles.firstCellFlex}>
                {/*<div>*/}
                {/*    <img src={user.image} alt=""/>*/}
                {/*</div>*/}
                <div className={classNames(styles.firstCellInfo, 'openSans')}>
                    <span><strong>{`${user.name}`}</strong></span> <br/>
                    {tempEmailRender}
                </div>
            </div>
        );
    }

    _handleDelete(id) {
        this.props.actionDeleteSubCategory(id);
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
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
            CreateProvider = require('./SubCategory.view').default;
        }
        if (this.state.side_panel) {
            const { id } = this.props.match.params;
            return (<CreateProvider
                handleDataSave={this._handleDataSave}
                listData={this.state.listData}
                data={this.state.edit_data}
                industries = {this.state.industries}
                category_id={id}
                types={this.state.types}
                handleDelete={this._handleDelete}></CreateProvider>);
        }
        return null;
    }

    render() {
        const { id } = this.props.match.params;
        const tableStructure = [
            {
                key: 'name',
                label: 'Info',
                sortable: true,
                render: (value, all) => <div>{this.renderFirstCell(all)}</div>,
            }, {
                key: 'category_name',
                label: 'Category Name',
                sortable: false,
                render: (temp, all) => <div >{all.category_name}</div>,
            },
            {
                key: 'status',
                label: 'Status',
                sortable: true,
                render: (temp, all) => <div>{this.renderStatus(all.status)}</div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div><Button onClick={this._handleEdit.bind(this, all)}>Info</Button></div>)
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
                <PageBox>
                    <div className={styles.headerContainer}>
                        {id !== undefined ?<ButtonBase onClick={this._handleBack}>
                            <KeyboardArrowLeft fontSize={'large'}/>
                        </ButtonBase> : ''}
                        <span className={styles.title}>SubCategories List</span>
                        <Button onClick={this._handleSideToggle} variant={'contained'} color={'primary'}
                                // disabled={this.state.is_calling}
                        >
                            <Add></Add> Create
                        </Button>
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
                                />
                            </div>
                        </div>
                    </div>

                </PageBox>
                <SidePanelComponent
                    handleToggle={this._handleSideToggle}
                    title={'New SubCategory'} open={this.state.side_panel} side={'right'}>
                    {this._renderCreateForm()}
                </SidePanelComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.subcategory.present,
        total_count: state.subcategory.all.length,
        currentPage: state.subcategory.currentPage,
        serverPage: state.subcategory.serverPage,
        sorting_data: state.subcategory.sorting_data,
        is_fetching: state.subcategory.is_fetching,
        query: state.subcategory.query,
        query_data: state.subcategory.query_data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionFetchData: actionFetchSubCategory,
        actionSetPage: actionSetPageSubCategory,
        actionResetFilter: actionResetFilterSubCategory,
        actionSetFilter: actionFilterSubCategory,
        actionChangeStatus: actionChangeStatusSubCategory,
        actionCreateSubCategory: actionCreateSubCategory,
        actionUpdateSubCategory: actionUpdateSubCategory,
        actionDeleteSubCategory: actionDeleteSubCategory,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryList);

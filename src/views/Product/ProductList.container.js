/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component} from 'react';
import {Button, Paper,Checkbox,IconButton} from '@material-ui/core';

import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    red as redColor,
} from '@material-ui/core/colors';
import {Add} from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
import SidePanelComponent from '../../components/SidePanel/SidePanel.component';
// import CreateProvider from './Create.container';
import styles from './Style.module.css';
// import DataTables from '../../Datatables/DataTableSrc/DataTables';
import DataTables from '../../Datatables/Datatable.table';
import Constants from '../../config/constants';
import FilterComponent from '../../components/Filter/Filter.component';
import {
    actionFetchProduct,
    actionChangePageProductRequests,
    actionChangeStatusProductRequests,
    actionFilterProductRequests,
    actionResetFilterProductRequests,
    actionSetPageProductRequests,
    actionCreateProduct,
    actionUpdateProduct,
    actionDeleteProduct
} from '../../actions/Product.action';
import {serviceGetListData} from "../../services/index.services";
import {serviceGetCustomList} from "../../services/Common.service";
import { InputRounded as EditIcon, RemoveRedEyeOutlined as ViewIcon } from '@material-ui/icons';

let CreateProvider = null;

class ProductList extends Component {
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
            categories: [],
            units: [],
            stores: [],
            is_calling: true,
        };
        this.configFilter = [
            {label: 'Created On', name: 'createdAt', type: 'date'},
            {label: 'Status', name: 'status', type: 'select', fields: ['PENDING', 'ACTIVE']},
            {label: 'Stores', name: 'store_id', type: 'selectObject', custom: { extract: { id: 'id', title: 'name' } } , fields: []},
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
        this._handleViewProductForm = this._handleViewProductForm.bind(this)
    }

    componentDidMount() {
        const request = serviceGetCustomList(['CATEGORY']);

        request.then((data) => {
            if (!data.error) {
                this.setState({
                    is_calling: false,
                    categories: data.data.categories,
                });
            } else {
                this.setState({
                    is_calling: false,
                })
            }
        })
        // if (this.props.total_count <= 0) {
        this.props.actionFetchData();
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
            this.props.actionCreateProduct(data)
        } else {
            this.props.actionUpdateProduct(data)
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
            <div className={styles.firstCellFlex}>

                <div className={styles.driverImgCont} style={{ borderColor: (user.deal_of_day ? '#f44336' : (user.is_featured ? '#16b716': 'white')) }}>
                    <img src={user.image} alt=""/>
                </div>
                <div className={classNames(styles.firstCellInfo, 'openSans')}>
                    <span className={styles.productName}><strong>{`${user.name}`}</strong></span> <br/>
                </div>
            </div>
        );
    }


    _handleDelete(id) {
        this.props.actionDeleteProduct(id);
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
            CreateProvider = require('./Product.view').default;
        }
        if (this.state.side_panel) {
            return (<CreateProvider
                handleDataSave={this._handleDataSave}
                categories={this.state.categories}
                units={this.state.units}
                stores={this.state.stores}
                data={this.state.edit_data}
                handleDelete={this._handleDelete}></CreateProvider>);
        }
        return null;
    }

    _handleViewProductForm(){
        this.props.history.push('/products/edit')
    }


    render() {
        const tableStructure = [

            {
                key: 'name',
                label: 'Info',
                sortable: true,
                render: (value, all) => <div>{this.renderFirstCell(all)}</div>,
            },
            {
                key: 'industry',
                label: 'Industry|Category|SubCategory',
                sortable: true,
                render: (temp, all) => <div className={styles.industry}>{all.industry}<br/><div>Prescription Medicine | Pharmacy</div></div>,
            },
            {
                key: 'status',
                label: 'Status | Featured',
                sortable: true,
                render: (temp, all) => <div>{this.renderStatus(all.status)}  <span className={styles.featured}>FEATURED</span></div>,
            },
            {
                key: 'min_price',
                label: 'Min Price/Unit | Min Quantity',
                sortable: true,
                render: (temp, all) => <div><b>{Constants.CURRENCY} {all.min_price}</b> / KG <br/><span style={{fontSize:'0.7rem'}}> 200 KG</span></div>,
            },
            {
                key: 'sellers',
                label: 'No. of Sellers',
                sortable: false,
                render: (temp, all) => <div>{all.sellers}</div>,
            },
            {
                key: 'createdAt',
                label: 'Last Updated',
                sortable: true,
                render: (temp, all) => <div>{all.createdAt}</div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div>
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={this.state.is_calling}  onClick={this._handleViewProductForm.bind(this, all)}><ViewIcon fontSize={'small'} /></IconButton >
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={this.state.is_calling}  onClick={this._handleEdit.bind(this, all)}><EditIcon fontSize={'small'} /></IconButton >
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
                        <span className={styles.title}>Product List</span>
                        <Button onClick={this._handleSideToggle} variant={'contained'} color={'primary'}>
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
                    title={'New Product'} open={this.state.side_panel} side={'right'}>
                    {this._renderCreateForm()}
                </SidePanelComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.product.present,
        total_count: state.product.all.length,
        currentPage: state.product.currentPage,
        serverPage: state.product.serverPage,
        sorting_data: state.product.sorting_data,
        is_fetching: state.product.is_fetching,
        query: state.product.query,
        query_data: state.product.query_data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionFetchData: actionFetchProduct,
        actionSetPage: actionSetPageProductRequests,
        actionResetFilter: actionResetFilterProductRequests,
        actionSetFilter: actionFilterProductRequests,
        actionChangeStatus: actionChangeStatusProductRequests,
        actionCreateProduct: actionCreateProduct,
        actionUpdateProduct: actionUpdateProduct,
        actionDeleteProduct: actionDeleteProduct,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

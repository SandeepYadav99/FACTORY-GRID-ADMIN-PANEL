// /**
//  * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
//  */
// import React, {Component} from 'react';
// import {Button, Paper} from '@material-ui/core';

// import classNames from 'classnames';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
// import {
//     red as redColor,
// } from '@material-ui/core/colors';
// import {Add} from '@material-ui/icons';
// import PageBox from '../../components/PageBox/PageBox.component';
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
// // import CreateProvider from './Create.container';
import styles from "./Style.module.css";
// // import DataTables from '../../Datatables/DataTableSrc/DataTables';
// import DataTables from '../../Datatables/Datatable.table';
// import Constants from '../../config/constants';
// import FilterComponent from '../../components/Filter/Filter.component';
// import {
//     actionFetchBadge,
//     actionChangePageBadgeRequests,
//     actionChangeStatusBadgeRequests,
//     actionFilterBadgeRequests,
//     actionResetFilterBadgeRequests,
//     actionSetPageBadgeRequests,
//     actionCreateBadge,
//     actionUpdateBadge,
//     actionDeleteBadge
// } from '../../actions/Badge.action';
// import {serviceGetListData} from "../../services/index.services";

// let CreateProvider = null;

// class BadgeList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             dialogState: false,
//             point_selected: null,
//             data: [],
//             page: 1,
//             total: Constants.DEFAULT_PAGE_VALUE + 1,
//             side_panel: false,
//             edit_data: null,
//             languages: [],
//             is_calling: true,
//         };
//         this.configFilter = [
//             {label: 'Created On', name: 'createdAt', type: 'date'},
//             {label: 'Status', name: 'status', type: 'select', fields: ['INACTIVE', 'ACTIVE']},
//         ];

//         this._handleFilterDataChange = this._handleFilterDataChange.bind(this);
//         this._queryFilter = this._queryFilter.bind(this);
//         this._handleSearchValueChange = this._handleSearchValueChange.bind(this);
//         this._handleSideToggle = this._handleSideToggle.bind(this);
//         this._handleSortOrderChange = this._handleSortOrderChange.bind(this);
//         this._handleRowSize = this._handleRowSize.bind(this);
//         this._handlePageChange = this._handlePageChange.bind(this);
//         this._handleEdit = this._handleEdit.bind(this);
//         this._handleDataSave = this._handleDataSave.bind(this);
//         this._handleDelete = this._handleDelete.bind(this);
//     }

//     componentDidMount() {
//         // if (this.props.total_count <= 0) {
//         this.props.actionFetchData();
//         // }
//     }

//     handleCellClick(rowIndex, columnIndex, row, column) {
//         console.log(`handleCellClick rowIndex: ${rowIndex} columnIndex: ${columnIndex}`);
//     }

//     _handlePageChange(type) {
//         console.log('_handlePageChange', type);
//         this.props.actionSetPage(type);
//     }

//     _handleDataSave(data, type) {
//         // this.props.actionChangeStatus({...data, type: type});
//         if (type == 'CREATE') {
//             this.props.actionCreateBadge(data)
//         } else {
//             this.props.actionUpdateBadge(data)
//         }
//         this.setState({
//             side_panel: !this.state.side_panel,
//             edit_data: null,
//         });
//     }

//     _queryFilter(key, value) {
//         console.log('_queryFilter', key, value);
//         this.props.actionSetPage(1);
//         this.props.actionFetchData(1, this.props.sorting_data, {
//             query: key == 'SEARCH_TEXT' ? value : this.props.query,
//             query_data: key == 'FILTER_DATA' ? value : this.props.query_data,
//         });
//     }

//     _handleFilterDataChange(value) {
//         console.log('_handleFilterDataChange', value);
//         this._queryFilter('FILTER_DATA', value);
//     }

//     _handleSearchValueChange(value) {
//         console.log('_handleSearchValueChange', value);
//         this._queryFilter('SEARCH_TEXT', value);
//     }

//     handlePreviousPageClick() {
//         console.log('handlePreviousPageClick', 'PREV');
//     }

//     handleNextPageClick() {
//         console.log('handleNextPageClick', 'NEXT');
//     }

//     _handleSortOrderChange(row, order) {
//         console.log(`handleSortOrderChange key:${row} order: ${order}`);
//         this.props.actionSetPage(1);
//         this.props.actionFetchData(1,
//             {row, order}, {
//                 query: this.props.query,
//                 query_data: this.props.query_data,
//             });
//         // this.props.fetchUsers(1, row, order, { query: this.props.query, query_data: this.props.query_data });
//     }

//     _handleRowSize(page) {
//         console.log(page);
//     }

//     // renderStatus(status) {
//     //     if (status === 'ACTIVE') {
//     //         return (
//     //             <span style={{
//     //                 fontSize: '12px',
//     //                 color: 'white',
//     //                 background: 'green',
//     //                 padding: '3px 10px',
//     //                 borderRadius: '20px',
//     //                 textTransform: 'capitalize'
//     //             }}>
//     //                 {(status)}
//     //             </span>
//     //         );
//     //     }
//     //     return (<span style={{
//     //         ...styles.spanFont,
//     //         fontSize: '12px',
//     //         color: 'white',
//     //         background: `${status == 'NEW' ? 'orange' : 'orange'}`,
//     //         padding: '3px 10px',
//     //         borderRadius: '20px',
//     //         textTransform: 'capitalize'
//     //     }}>{(status)}</span>);
//     // }

//     renderStatus(status) {
//         if (status === 'ACTIVE') {
//             return (
//                 <span style={{
//                     fontSize: '12px',
//                     color: '#20c997',
//                     background: 'rgba(32,201,151,.1)',
//                     padding: '3px 10px',
//                     borderRadius: '20px',
//                     textTransform: 'capitalize'
//                 }}>
//                     {(status)}
//                 </span>
//             );
//         }
//         return (<span style={{
//             ...styles.spanFont,
//             fontSize: '12px',
//             color: '#fa8b0c',
//             background: `${status == 'NEW' ? 'rgba(250,139,12,.1)' : 'rgba(250,139,12,.1)'}`,
//             padding: '3px 10px',
//             borderRadius: '20px',
//             textTransform: 'capitalize'
//         }}>{(status)}</span>);
//     }

//     renderFirstCell(user) {
//         const tempEmailRender = user.email ? (<span style={{textTransform: 'lowercase'}}>{(user.email)}</span>) : null;
//         return (
//             <div className={styles.firstCellFlex}>
//                 <div>
//                     <img src={user.image} alt=""/>
//                 </div>
//                 <div className={classNames(styles.firstCellInfo, 'openSans')}>
//                     <span><strong>{`${user.name}`}</strong></span> <br/>
//                     {tempEmailRender}
//                 </div>
//             </div>
//         );
//     }

//     _handleDelete(id) {
//         this.props.actionDeleteBadge(id);
//         this.setState({
//             side_panel: !this.state.side_panel,
//             edit_data: null,
//         });
//     }

//     _handleEdit(data) {
//         this.setState({
//             side_panel: !this.state.side_panel,
//             edit_data: data,
//         })
//     }

//     _handleSideToggle() {
//         this.setState({
//             side_panel: !this.state.side_panel,
//             edit_data: null,
//         });
//     }

//     _renderCreateForm() {
//         if (CreateProvider == null) {
//             // import CreateProvider from './Create.container';
//             CreateProvider = require('./Badge.view').default;
//         }
//         if (this.state.side_panel) {
//             return (<CreateProvider
//                 handleDataSave={this._handleDataSave}
//                 languages={this.state.languages}
//                 data={this.state.edit_data}
//                 handleDelete={this._handleDelete}></CreateProvider>);
//         }
//         return null;
//     }

//     render() {
//         const tableStructure = [
//             {
//                 key: 'name',
//                 label: 'Info',
//                 sortable: true,
//                 render: (value, all) => <div>{this.renderFirstCell(all)}</div>,
//             },
//             // {
//             //     key: 'products',
//             //     label: 'Products',
//             //     sortable: false,
//             //     render: (temp, all) => <div title={all.products_count}>{all.products_count}</div>,
//             // },
//             // {
//             //     key: 'createdAt',
//             //     label: 'Date',
//             //     sortable: true,
//             //     render: (temp, all) => <div>{all.createdAt}</div>,
//             // },
//             {
//                 key: 'status',
//                 label: 'Status',
//                 sortable: true,
//                 render: (temp, all) => <div>{this.renderStatus(all.status)}</div>,
//             },
//             {
//                 key: 'user_id',
//                 label: 'Action',
//                 render: (temp, all) => (<div><Button onClick={this._handleEdit.bind(this, all)}>Info</Button></div>),
//             },

//         ];
//         const datatableFunctions = {
//             onCellClick: this.handleCellClick,
//             // onCellDoubleClick: this.handleCellDoubleClick,
//             // onFilterValueChange: this._handleSearchValueChange.bind(this),
//             onSortOrderChange: this._handleSortOrderChange,
//             onPageChange: this._handlePageChange,
//             onRowSelection: this.handleRowSelection,
//             onRowSizeChange: this._handleRowSize,

//         };
//         const datatable = {
//             ...Constants.DATATABLE_PROPERTIES,
//             columns: tableStructure,
//             data: this.props.data,
//             count: this.props.total_count,
//             page: this.props.currentPage,
//         };
//         return (
//             <div>
//                 <PageBox>
//                     <div className={styles.headerContainer}>
//                         <span className={styles.title}>Badges List</span>
//                         <Button onClick={this._handleSideToggle} variant={'contained'} color={'primary'}>
//                             <Add></Add> Create
//                         </Button>
//                     </div>

//                     <div>
//                         <FilterComponent
//                             is_progress={this.props.is_fetching}
//                             filters={this.configFilter}
//                             handleSearchValueChange={this._handleSearchValueChange.bind(this)}
//                             handleFilterDataChange={this._handleFilterDataChange}
//                         />
//                         <div>
//                             <br/>
//                             <div style={{width: '100%'}}>
//                                 <DataTables
//                                     {...datatable}
//                                     {...datatableFunctions}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                 </PageBox>
//                 <SidePanelComponent
//                     handleToggle={this._handleSideToggle}
//                     title={'New Badge'} open={this.state.side_panel} side={'right'}>
//                     {this._renderCreateForm()}
//                 </SidePanelComponent>
//             </div>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return {
//         data: state.badge.present,
//         total_count: state.badge.all.length,
//         currentPage: state.badge.currentPage,
//         serverPage: state.badge.serverPage,
//         sorting_data: state.badge.sorting_data,
//         is_fetching: state.badge.is_fetching,
//         query: state.badge.query,
//         query_data: state.badge.query_data,
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         actionFetchData: actionFetchBadge,
//         actionSetPage: actionSetPageBadgeRequests,
//         actionResetFilter: actionResetFilterBadgeRequests,
//         actionSetFilter: actionFilterBadgeRequests,
//         actionChangeStatus: actionChangeStatusBadgeRequests,
//         actionCreateBadge: actionCreateBadge,
//         actionUpdateBadge: actionUpdateBadge,
//         actionDeleteBadge: actionDeleteBadge,
//     }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(BadgeList);

import React, { useCallback, useMemo } from "react";
import { Button, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";

import PageBox from "../../components/PageBox/PageBox.component";

import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";

import useBadgeListHook from "./BadgeList.Hook";
import { Add } from "@material-ui/icons";
import BadgeView from "./Badge.view";

const BadgeListContainer = (props) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    handleSideToggle,
    isSidePanel,
    editData
    // handleToggleSidePannel
  } = useBadgeListHook({});

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.badge);

  const renderFirstCell = useCallback(({ user }) => {
    const tempEmailRender = user?.email ? (
      <span style={{ textTransform: "lowercase" }}>{user?.email}</span>
    ) : null;

    return (
      <div className={styles.firstCellFlex}>
        <div>
          <img src={user?.image} alt="" />
        </div>
        <div className={classNames(styles.firstCellInfo, "openSans")}>
          <span>
            <strong>{`${user?.name}`}</strong>
          </span>{" "}
          <br />
          {tempEmailRender}
        </div>
      </div>
    );
  }, []);

  const renderStatus = useCallback(({ status }) => {
    const activeStyle = {
      fontSize: "12px",
      color: "#20c997",
      background: "rgba(32,201,151,.1)",
      padding: "3px 10px",
      borderRadius: "20px",
      textTransform: "capitalize",
    };

    const inactiveStyle = {
      fontSize: "12px",
      color: "#fa8b0c",
      background: `rgba(250,139,12,.1)`,
      padding: "3px 10px",
      borderRadius: "20px",
      textTransform: "capitalize",
    };

    return (
      <span style={status === "ACTIVE" ? activeStyle : inactiveStyle}>
        {status}
        {/* Hi */}
      </span>
    );
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "Info",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>, //renderFirstCell(all)
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => <div>{renderStatus(all)}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <Button onClick={() => handleEdit(all)}>Info</Button>
          </div>
        ),
      },
    ];
  }, [
    handleViewDetails,
    handleEdit,
    isCalling,
    // renderContact,
    renderFirstCell,
    renderStatus,
  ]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };
    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: present,
      count: allData.length,
      page: currentPage,
    };

    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    present,
    currentPage,
  ]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <span className={styles.title}>Badges List</span>
          <Button
            onClick={handleSideToggle}
            variant={"contained"}
            color={"primary"}
          >
            <Add></Add> Create
          </Button>
        </div>

        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter} // configFilter
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
          <div>
            <br />
            <div style={{ width: "100%" }}>
              <DataTables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
          </div>
        </div>
      </PageBox>
      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={"New Badge"}
        open={isSidePanel}
        side={"right"}
      >
        <BadgeView
          handleToggleSidePannel={handleSideToggle}
          isSidePanel={isSidePanel}
          empId={editData}
        />
      </SidePanelComponent>
    </div>
  );
};

export default BadgeListContainer;

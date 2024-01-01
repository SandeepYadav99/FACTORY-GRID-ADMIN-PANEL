/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, { Component } from "react";
import { Button, Paper } from "@material-ui/core";

import classNames from "classnames";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { red as redColor } from "@material-ui/core/colors";
import { Add } from "@material-ui/icons";
import PageBox from "../../../src/components/PageBox/PageBox.component";
import SidePanelComponent from "../../../src/components/SidePanel/SidePanel.component";
// import CreateProvider from './Create.container';
import styles from "./Blogs.module.css";
// import DataTables from '../../Datatables/DataTableSrc/DataTables';
import DataTables from "../../../src/Datatables/Datatable.table";
import Constants from "../../../src/config/constants";
import FilterComponent from "../../../src/components/Filter/Filter.component";
import {
  actionFetchBlogs,
  actionChangePageBlogs,
  actionChangeStatusBlogs,
  actionFilterBlogs,
  actionResetFilterBlogs,
  actionSetPageBlogs,
  actionCreateBlogs,
  actionUpdateBlogs,
  actionDeleteBlogs,
} from "../../actions/Blogs.action";
import {
  serviceFetchTourTypes,
  serviceGetTagsList,
} from "../../services/Blogs.service";
import { serviceGetCustomList } from "../../services/Common.service";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuItemView from "./component/MenuItem.component";
import { serviceGetIndustryList } from "../../services/Industry.service";

let CreateProvider = null;
class BlogsList extends Component {
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
      tour_types: [],
      cities: [],
      anchorEl: null,
      open: false,
      industries: [],
      all_tags: [],
    };
    this.configFilter = [
      // {label: 'Country', name: 'country', type: 'text'},
      {
        label: "Request Date",
        name: "createdAt",
        type: "date",
        options: { maxDate: new Date() },
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["INACTIVE", "ACTIVE"],
      },
      {
        label: "Industry",
        name: "industry_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: [],
      },
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
  }

  componentDidMount() {
    // if (this.props.total_count <= 0) {
    this.props.actionFetchData();
    const request = serviceGetIndustryList();
    request.then((data) => {
      if (!data.error) {
        this.setState({
          industries: data.data,
        });
        this.configFilter[2].fields = data.data;
      }
    });

    // serviceGetTagsList().then((res) => {
    //     if (!res.error) {
    //         this.setState({
    //             all_tags: res.data,
    //         });
    //     }
    // });
  }

  handleCellClick(rowIndex, columnIndex, row, column) {
    console.log(
      `handleCellClick rowIndex: ${rowIndex} columnIndex: ${columnIndex}`
    );
  }

  _handlePageChange(type) {
    console.log("_handlePageChange", type);
    this.props.actionSetPage(type);
  }

  _queryFilter(key, value) {
    console.log("_queryFilter", key, value);
    // this.props.actionSetPage(1);
    this.props.actionFetchData(
      1,
      this.props.sorting_data,
      {
        query: key == "SEARCH_TEXT" ? value : this.props.query,
        query_data: key == "FILTER_DATA" ? value : this.props.query_data,
      },
      true
    );
  }

  _handleFilterDataChange(value) {
    console.log("_handleFilterDataChange", value);
    this._queryFilter("FILTER_DATA", value);
  }

  _handleSearchValueChange(value) {
    console.log("_handleSearchValueChange", value);
    this._queryFilter("SEARCH_TEXT", value);
  }

  handlePreviousPageClick() {
    console.log("handlePreviousPageClick", "PREV");
  }

  handleNextPageClick() {
    console.log("handleNextPageClick", "NEXT");
  }

  _handleSortOrderChange(row, order) {
    console.log(`handleSortOrderChange key:${row} order: ${order}`);
    // this.props.actionSetPage(1);
    this.props.actionFetchData(
      1,
      { row, order },
      {
        query: this.props.query,
        query_data: this.props.query_data,
      },
      row
    );
    // this.props.fetchUsers(1, row, order, { query: this.props.query, query_data: this.props.query_data });
  }

  _handleRowSize(page) {
    console.log(page);
  }

  renderStatus(status) {
    if (status === "ACTIVE") {
      return (
        <span
          style={{
            fontSize: "12px",
            color: "#20c997",
            background: "rgba(32,201,151,.1)",
            padding: "3px 10px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {status}
        </span>
      );
    }
    return (
      <span
        style={{
          ...styles.spanFont,
          fontSize: "12px",
          color: "#fa8b0c",
          background: `${
            status == "NEW" ? "rgba(250,139,12,.1)" : "rgba(250,139,12,.1)"
          }`,
          padding: "3px 10px",
          borderRadius: "20px",
          textTransform: "capitalize",
        }}
      >
        {status}
      </span>
    );
  }

  renderFirstCell(user) {
    const tempEmailRender = user.email ? (
      <span style={{ textTransform: "lowercase" }}>{user.email}</span>
    ) : null;
    return (
      <div className={"userDetailLeague"} title={user.otp}>
        <div className={classNames("userDetailLeagueText", "openSans")}>
          <span>
            <strong>{user.name}</strong>
          </span>{" "}
          <br />
          {tempEmailRender}
        </div>
      </div>
    );
  }

  _handleEdit(data) {
    this.setState({
      side_panel: !this.state.side_panel,
      edit_data: data,
    });
  }

  _handleSideToggle() {
    this.setState({
      side_panel: !this.state.side_panel,
      edit_data: null,
    });
  }

  _handleDelete(id) {
    this.props.actionDelete(id);
    this.setState({
      side_panel: !this.state.side_panel,
      edit_data: null,
    });
  }

  _renderCreateForm() {
    const { all_tags } = this.state;
    if (CreateProvider == null) {
      // import CreateProvider from './Create.container';
      CreateProvider = require("./Blogs.view").default;
    }
    if (this.state.side_panel) {
      return (
        <CreateProvider
          data={this.state.edit_data}
          cities={this.state.cities}
          tour_types={this.state.tour_types}
          industries={this.state.industries}
          handleDataSave={this._handleDataSave}
          handleDelete={this._handleDelete}
        ></CreateProvider>
      );
    }
    return null;
  }
  _handleChangeStatus(data, type) {
    this.props.actionChangeStatus({ ...data, type: type });
    this.setState({
      side_panel: !this.state.side_panel,
      edit_data: null,
    });
  }

  _handleDataSave(data, type) {
    // this.props.actionChangeStatus({...data, type: type});
    if (type == "CREATE") {
      this.props.actionCreateBlogs(data);
    } else {
      this.props.actionUpdateBlogs(data);
    }
    this.setState({
      side_panel: !this.state.side_panel,
      edit_data: null,
    });
  }

  handleClick(event) {
    console.log("event", event.currentTarget);
    this.setState({
      anchorEl: event.currentTarget,
      open: true,
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null,
      open: false,
    });
  }

  render() {
    const { anchorEl, open } = this.state;
    const aspectRatio = 16 / 9;
    const desiredHeight = 40;
    const tableStructure = [
      // {
      //     key: 'category_name',
      //     label: 'Category Name',
      //     sortable: true,
      //     render: (value, all) => <div>{this.renderFirstCell(all)}</div>,
      // },
      {
        key: "title",
        label: "Title",
        sortable: false,
        render: (temp, all) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={all?.cover_image}
              alt=""
              height={desiredHeight}
              width={desiredHeight * aspectRatio}
            />
            <div style={{ marginLeft: "10px" }}>{all.title}</div>
          </div>
        ),
      },
      {
        key: "industry",
        label: "Industry",
        sortable: false,
        render: (temp, all) => <div>{all.industry_name}</div>,
      },
      {
        key: "author",
        label: "Author",
        sortable: false,
        render: (temp, all) => <div>{all.author}</div>,
      },
      {
        key: "featured",
        label: "Featured",
        sortable: false,
        render: (temp, all) => <div>{all.is_featured ? "Yes" : "No"}</div>,
      },
      {
        key: "createdAt",
        label: "Date",
        sortable: true,
        render: (temp, all) => <div>{all.createdAt}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => <div>{this.renderStatus(all.status)}</div>,
      },
      {
        key: "_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <MenuItemView
              handleEdit={this._handleEdit.bind(this, all)}
              blogId={all.slug}
            />
          </div>
        ),
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
            <span className={styles.title}>Blogs List</span>
            <Button
              onClick={this._handleSideToggle}
              variant={"contained"}
              color={"primary"}
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
              <br />
              <div style={{ width: "100%" }}>
                <DataTables {...datatable} {...datatableFunctions} />
              </div>
            </div>
          </div>
        </PageBox>
        <SidePanelComponent
          handleToggle={this._handleSideToggle}
          title={"Blogs"}
          open={this.state.side_panel}
          side={"right"}
        >
          {this._renderCreateForm()}
        </SidePanelComponent>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.blogs.present,
    total_count: state.blogs.all.length,
    currentPage: state.blogs.currentPage,
    serverPage: state.blogs.serverPage,
    sorting_data: state.blogs.sorting_data,
    is_fetching: state.blogs.is_fetching,
    query: state.blogs.query,
    query_data: state.blogs.query_data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actionFetchData: actionFetchBlogs,
      actionSetPage: actionSetPageBlogs,
      actionResetFilter: actionResetFilterBlogs,
      actionSetFilter: actionFilterBlogs,
      actionChangeStatus: actionChangeStatusBlogs,
      actionCreateBlogs: actionCreateBlogs,
      actionUpdateBlogs: actionUpdateBlogs,
      actionDelete: actionDeleteBlogs,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogsList);

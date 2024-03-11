import React, { useCallback, useMemo } from "react";
import { Avatar, Button, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import PageBox from "../../components/PageBox/PageBox.component";

import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";

import {
  AccountBox,
  AccountCircle,
  Add,
  Create,
  Delete,
  Info,
} from "@material-ui/icons";
import useTopManufacatureHook from "./TopManufacatureHook";
import StatusPill from "../../components/Status/StatusPill.component";
import TopManufactureCreate from "../Create/TopManufactureCreate";


const TopManufacatures = (props) => {
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
    editData,
    editId,
    handleOpenSidePanel,
    handleToggleSidePannel,
  } = useTopManufacatureHook({});

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.topManufacture);

  const renderFirstCell = useCallback((user) => {
    const tempEmailRender = user?.email ? (
      <a style={{ textTransform: "lowercase" }}>{user?.email}</a>
    ) : null;

    return (
      <div className={styles.firstCellFlex}>
        <div>
          <img src={user?.business?.company_logo} alt="" />
        </div>
        <div className={classNames(styles.firstCellInfo, "openSans")}>
          <p className={styles.firstCellName}>
            <a href="">{`${user?.business?.company_name}`}</a>
          </p>{" "}
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
        key: "business_name",
        label: "Business Name",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)} </div>,
      },
      {
        key: "Account_Manager",
        label: "Account Manager",
        sortable: false,
        render: (value, all) => <div>{all?.admins?.name || "N/A"} </div>,
      },
      {
        key: "industry",
        label: "Industry",
        sortable: false,
        render: (value, all) => <div>{all?.industry?.name} </div>,
      },

      {
        key: "featured_on",
        label: "Featured on",
        sortable: false,
        render: (value, all) => (
          <div>
          {all?.is_featured_home && !all?.is_featured_industry && <StatusPill status={"HOME"} style={{color:"#5F63F2"}}/>}
          {!all?.is_featured_home && all?.is_featured_industry && <StatusPill status={"INDUSTRY"} style={{color:"#FA55AD"}}/>}
          {all?.is_featured_home && all?.is_featured_industry && <StatusPill status={"BOTH"} style={{color:"#0F49A0"}} />}
        </div>
        ),
      },
      {
        key: "Updaated_on",
        label: "Updated On",
        sortable: false,
        render: (value, all) => <div>{all?.updatedAtText} </div>,
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
            <IconButton>
              <AccountCircle fontSize={"small"} />
            </IconButton>
            <IconButton>
              <Delete fontSize={"small"} />
            </IconButton>
            <IconButton>
              <Create fontSize={"small"} />
            </IconButton>
            {/* <Button onClick={() => handleEdit(all)}>Info</Button> */}
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
    handleEdit,
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
          <span className={styles.title}>Top Manufactures List</span>
          <Button
            onClick={handleOpenSidePanel}
            variant={"contained"}
            color={"primary"}
          >
            <Add></Add> Add
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
        handleToggle={handleOpenSidePanel}
        title={editId ? "Update Manufacturer" : "Add Manufacturer"}
        open={isSidePanel}
        side={"right"}
      >
        <TopManufactureCreate
          handleToggleSidePannel={handleOpenSidePanel}
          isSidePanel={isSidePanel}
          empId={editId}
        />
      </SidePanelComponent>
    </div>
  );
};

export default TopManufacatures;

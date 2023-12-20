
import React, { useCallback, useMemo } from "react";
import { Button, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
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
    editData,
    editId,
    handleSideOpenSide,
     handleToggleSidePannel
  } = useBadgeListHook({});

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.badge);

  const renderFirstCell = useCallback((user) => {
    console.log(user, "User ");
    const tempEmailRender = user?.email ? (
      <span style={{ textTransform: "lowercase" }}>{user?.email}</span>
    ) : null;

    return (
      <div className={styles.firstCellFlex}>
        <div>
          <img src={user?.logo} alt="" />
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
        render: (value, all) => <div>{renderFirstCell(all)} </div>, //renderFirstCell(all)
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
    handleEdit
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
            onClick={handleSideOpenSide}
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
        title={editId ? "Update Badge" : "New Badge"}
        open={isSidePanel}
        side={"right"}
      >
        <BadgeView
          handleToggleSidePannel={handleSideToggle}
          isSidePanel={isSidePanel}
          empId={editId}
        />
      </SidePanelComponent>
    </div>
  );
};

export default BadgeListContainer;


import React, { useCallback, useMemo } from "react";
import { Button, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import styles from "../Style.module.css";
import PageBox from "../../../components/PageBox/PageBox.component";

import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";


import { Add, RemoveRedEyeOutlined } from "@material-ui/icons";

import useIndustryListHook from "./IndustryListHook";
import IndustryCreateView from "../Create/IndustryCreate";

const IndustryListContainer = (props) => {
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
     handleToggleSidePannel
  } = useIndustryListHook({});

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.industry);

  const renderFirstCell = (user) => {
    const tempEmailRender = user.email ? (
      <span style={{ textTransform: "lowercase" }}>{user.email}</span>
    ) : null;
    return (
      <div className={styles.firstCellFlex}>
        <div>
          <img src={user.logo} alt="" />
        </div>
        <div className={classNames(styles.firstCellInfo, "openSans")}>
          <span>
            <strong>{`${user.name}`}</strong>
          </span>{" "}
          <br />
          {tempEmailRender}
        </div>
      </div>
    );
  };

  const renderStatus = (status) => {
    let className = "warning";
    if (status in Constants.STATUS) {
      className = Constants.STATUS[status];
    }
    if (status === "PENDING") {
      return <span className={classNames("status", className)}>Coming Soon</span>;
    }
    return <span className={classNames("status", className)}>{status.replaceAll("_", " ")}</span>;
  };

  const handlePreviewToggle = (data) => {
    window.open("http://91.205.173.97:8093/industry", "_blank");
  };

  const handleCategories = (data) => {
    // Handle category navigation
  };

  const tableStructure = useMemo(() => {
   return [
        {
          key: "name",
          label: "Info",
          sortable: true,
          render: (value, all) => <div>{renderFirstCell(all)}</div>,
        },
        {
          key: "total_categories",
          label: "Category Count",
          sortable: false,
          render: (temp, all) => <div>{all.total_categories}</div>,
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          render: (temp, all) => <div>{renderStatus(all.status)}</div>,
        },
        {
          key: "user_id",
          label: "Action",
          render: (temp, all) => (
            <div>
              <Button onClick={() => handleEdit(all)}>Info</Button>
              <IconButton className={"tableActionBtn"} color="secondary" onClick={() => handlePreviewToggle(all)}>
                <RemoveRedEyeOutlined fontSize={"small"} />
              </IconButton>
              <Button onClick={() => handleCategories(all)} color={"primary"}>
                Categories
              </Button>
            </div>
          ),
        },
      ];
  }, [
    handleViewDetails,
    handleEdit,
    isCalling,
    handlePreviewToggle,
    renderFirstCell,
    renderStatus,
    handleEdit,
    handleCategories
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
        <span className={styles.title}>Industries List</span>
          <Button
            onClick={handleOpenSidePanel}
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
        handleToggle={handleOpenSidePanel}
        title={editId ? "Update Badge" : "New Badge"}
        open={isSidePanel}
        side={"right"}
      >
        <IndustryCreateView
          handleToggleSidePannel={handleOpenSidePanel}
          isSidePanel={isSidePanel}
          empId={editId}
        />
      </SidePanelComponent>
    </div>
  );
};

export default IndustryListContainer;

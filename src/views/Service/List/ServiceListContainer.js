
import React, { useCallback, useMemo } from "react";
import { Button, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import styles from "../List/Style.module.css";
import PageBox from "../../../components/PageBox/PageBox.component";

import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";

import useServiceListHook from "./ServiceList.Hook";
import { Add } from "@material-ui/icons";
import ServiceView from "../Create/ServiceCreate.view";

const ServiceListContainer = (props) => {
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
  } = useServiceListHook({});

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state?.Service);

  const renderFirstCell = useCallback((user) => {
    console.log(present, "present ");
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


  const renderPriority = useCallback(({ priority }) => {
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
      <span style={priority === "ACTIVE" ? activeStyle : inactiveStyle}>
        {priority}
        {/* Hi */}
      </span>
    );
  }, []);


  const renderFeatured = useCallback(({ is_featured }) => {
    console.log(is_featured,"is_featured")
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
      <span >
        {is_featured?"YES":"NO"}
        {/* Hi */}
      </span>
    );
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "Service",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)} </div>, //renderFirstCell(all)
      },
      {
        key: "priority",
        label: "Priority",
        sortable: true,
        render: (temp, all) => <div>{renderPriority(all)}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => <div>{renderStatus(all)}</div>,
      },

      

      {
        key: "is_featured",
        label: "Featured",
        sortable: true,
        render: (temp, all) => <div>{renderFeatured(all)}</div>,
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
          <span className={styles.title}>Services List</span>
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
        title={editId ? "Update Service" : "New Service"}
        open={isSidePanel}
        side={"right"}
      >
        <ServiceView
          handleToggleSidePannel={handleOpenSidePanel}
          isSidePanel={isSidePanel}
          empId={editId}
        />
      </SidePanelComponent>
    </div>
  );
};

export default ServiceListContainer;

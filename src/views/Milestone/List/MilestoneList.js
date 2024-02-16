import React, { useCallback, useMemo } from "react";
import { Button, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import PageBox from "../../../components/PageBox/PageBox.component";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import { Add, Create } from "@material-ui/icons";
import useMilestoneHook from "./MilestoneHook";
import MILESTONECreate from "../Create/MilestoneCreate";
import StatusPill from "../../../FormFields/Status/StatusPill.component";
import capitalizeFirstLetter from "../../../hooks/CommonFunction";

const MilestoneList = (props) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    handleSideToggle,
    isSidePanel,
    editId,
    handleEditMILESTONE,
  } = useMilestoneHook({});

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.Milestone);

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

  const renderAssociatedIndustriesName = useCallback((industryData) => (
    <div>
      {industryData?.map((industry, index) => (
        <React.Fragment key={index}>
          {industry.name}
          {index < industryData.length - 1 && ", "}
        </React.Fragment>
      ))}
    </div>
  ),[])

//   Milestone Title
// Milstone Name
// Description
// Created At
// Upadated At
  
  const tableStructure = useMemo(() => {
    return [
      
      {
        key: "hub",
        label: "Name",
        sortable: true,
        render: (value, all) => <div>{capitalizeFirstLetter(all?.name)} </div>, 
      },
      {
        key: "hub",
        label: "Title",
        sortable: true,
        render: (value, all) => <div>{capitalizeFirstLetter(all?.title)} </div>, 
      },
      {
        key: "hub",
        label: "Description",
        sortable: true,
        render: (value, all) => <div>{capitalizeFirstLetter(all?.description)} </div>, 
      },
      {
        key: "hub",
        label: "Created At",
        sortable: true,
        render: (value, all) => <div>{capitalizeFirstLetter(all?.createdAtText)} </div>, 
      },
     
      {
        key: "hub",
        label: "Upadated At",
        sortable: true,
        render: (value, all) => <div>{capitalizeFirstLetter(all?.updatedAtText)} </div>, 
      },

      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                // handleSideToggle(all?.id);
                handleEditMILESTONE(all)
              }}
            >
              <Create fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [renderAssociatedIndustriesName, isCalling, handleEditMILESTONE]);

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
          <span className={styles.title}>Master Milestone</span>
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
        title={editId ? "Update Milestone" : "Milestone"}
        open={isSidePanel}
        side={"right"}
      >
        <MILESTONECreate
          handleSideToggle={handleSideToggle}
          isSidePanel={isSidePanel}
          empId={editId}
        />
      </SidePanelComponent>
    </div>
  );
};

export default MilestoneList;

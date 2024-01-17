/**
 * Created by sandeep.electrovese@gmail.com on 11/02/2020.
 */
import React, { Component, useCallback, useMemo } from "react";
import { Button, ButtonBase, IconButton, withStyles } from "@material-ui/core";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import styles from "./Style.module.css";
import classNames from "classnames";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";

import FilterComponent from "../../../components/Filter/Filter.component";

import { useSelector } from "react-redux";
import SendIcon from "@material-ui/icons/Send";

import RouteName from "../../../routes/Route.name";
import historyUtils from "../../../libs/history.utils";
import useAssociatedManufacturesHook from "./AssociatedManufacturesHook";
import StatusPill from "../../../components/Status/StatusPill.component";

const AssociatedManufactures = ({ listData }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    editData,
    isCalling,
    configFilter,

    handleToggleSidePannel,

    handleToggleSend,
  } = useAssociatedManufacturesHook({ listData });

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.hubMaster);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((product) => {
    if (product) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span>
              <strong></strong>
            </span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const handleViewEmployee = useCallback((data) => {
    historyUtils.push(`${RouteName.EMPLOYEE_DETAIL}${data}`);
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "manufacturer",
        label: "Manufacturer",
        sortable: false,
        render: (temp, all) => (
          <div>
            <div
              onClick={() => handleViewEmployee(all?.emp_code)}
              className={styles.hyperlinkText}
            >
              {all?.name}
            </div>
            <br />
            <div>{all?.emp_code}</div>
          </div>
        ),
      },
      {
        key: "company_name",
        label: "Company Name",
        sortable: false,
        render: (temp, all) => <div>{all?.doj}</div>,
      },
      {
        key: "membership_plan",
        label: "Membership Plan",
        sortable: false,
        render: (temp, all) => <div>{all?.dobText}</div>,
        //  candidate?.applied_date
      },
      {
        key: "joined_on",
        label: "Joined On",
        sortable: false,
        render: (temp, all) => <div>{all?.designation?.name}</div>,
      },
      {
        key: "last_activity",
        label: "Last Activity",
        sortable: false,
        render: (temp, all) => <div>{all?.department?.name}</div>,
      },
      
      
      {
        key: "status",
        label: "Current Status",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.btnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              // disabled={isCalling}
              onClick={() => {
                // handleViewDetails(all);
                handleToggleSidePannel(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);

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
      count:  allData?.length,
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
      <div>
        <div>
          <div>
            {/* <FilterComponent
              is_progress={isFetching}
              filters={configFilter}
              handleSearchValueChange={handleSearchValueChange}
              handleFilterDataChange={handleFilterDataChange}
            /> */}
          </div>

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
        {/* <SendPopup
          isOpen={isSend}
          handleToggle={handleToggleSend}
          handleSubmit={handleResend}
          empId={empId}
        /> */}
      </div>
    </div>
  );
};

export default AssociatedManufactures;

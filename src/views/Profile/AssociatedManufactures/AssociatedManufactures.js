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

const AssociatedManufactures = ({ listData, id }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleViewDetails,
    isCalling,
  } = useAssociatedManufacturesHook({ listData, id });

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.associatedManufactures);

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

  const tableStructure = useMemo(() => {
    return [
      {
        key: "manufacturer",
        label: "Manufacturer",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.image}>
            <img src={all?.image} className={styles.imageContainer} />

            <div style={{ marginLeft: "3px" }}> {all?.first_name} </div>
            <div style={{ marginLeft: "5px" }}>{all?.last_name}</div>
          </div>
        ),
      },
      {
        key: "company_name",
        label: "Company Name",
        sortable: false,
        render: (temp, all) => <div>{all?.business?.company_name}</div>,
      },
      {
        key: "membership_plan",
        label: "Membership Plan",
        sortable: false,
        render: (temp, all) => <div>{all?.membership_type}</div>,
        //  candidate?.applied_date
      },
      {
        key: "joined_on",
        label: "Joined On",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText || "N/A"}</div>,
      },
      {
        key: "last_activity",
        label: "Last Activity",
        sortable: false,
        render: (temp, all) => <div>{all?.lastLoginText || "N/A"}</div>,
      },

      {
        key: "status",
        label: "Current Status",
        sortable: false,
        render: (temp, all) => <StatusPill status={all?.status} />,
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
      count: allData?.length,
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
      <div style={{ width: "100%" }}>
        <DataTables
          {...tableData.datatable}
          {...tableData.datatableFunctions}
        />
      </div>
    </div>
  );
};

export default AssociatedManufactures;

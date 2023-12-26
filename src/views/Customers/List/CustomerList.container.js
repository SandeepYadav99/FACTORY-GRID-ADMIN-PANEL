/**
 * Update by sandeepelectrovese@gmail.com ->
 *  Class based Component to Function based Component 12/13/2023
 */
import React, { useCallback, useMemo } from "react";
import {  IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import {  Info as EditIcon } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "../styles.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import useCustomerListHook from "./CustomerListHook";

const CustomerList = (props) => {
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
  } = useCustomerListHook({});
  
  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.customers);

  const renderFirstCell = useCallback((user) => {
    return (
      <div className={styles.firstCellFlex}>
        <div>
          <img src={user.image} alt="" />
        </div>
        <div className={classNames(styles.firstCellInfo, "openSans")}>
          <span>
            <strong>{user.name}</strong>
          </span>{" "}
          <br />
          <span>{user.industry_name}</span>
        </div>
      </div>
    );
  }, []);


  const renderStatus = useCallback((status) => {
    if (status === "ACTIVE") {
      return (
        <span
          style={{
            fontSize: "12px",
            color: "white",
            background: "green",
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
          color: "white",
          background: `${status == "NEW" ? "orange" : "orange"}`,
          padding: "3px 10px",
          borderRadius: "20px",
          textTransform: "capitalize",
        }}
      >
        {status}
      </span>
    );
  }, []);

  const renderContact = useCallback((all) => {
    return (
      <div>
        {all.contact}
        <br />
        <div style={{ fontSize: "11px" }}>
          OTP-
          <span
            style={{
              marginLeft: "5px",
              color: "white",
              background: "#2c3f8b",
              padding: "2px 7px",
              borderRadius: "10px",
              textTransform: "capitalize",
            }}
          >
            777777
          </span>
        </div>
        <div>Email - {all.email}</div>
      </div>
    );
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "Name",
        sortable: true,
        style: { width: "20%" },
        render: (temp, all) => (
          <div style={{ wordBreak: "break-word" }}>{renderFirstCell(all)}</div>
        ),
      },
      {
        key: "contact_string",
        label: "Contact",
        sortable: false,
        style: { width: "20%" },
        render: (temp, all) => (
          <div style={{ wordBreak: "break-word" }}>{renderContact(all)}</div>
        ),
      },
      {
        key: "user_type",
        label: "User Type",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all.user_type ? Constants.USER_TYPES[all.user_type] : "N/A"}
          </div>
        ),
      },
      {
        key: "orders",
        label: "Orders",
        sortable: false,
        render: (temp, all) => <div>{all.orders || "N/A"}</div>,
      },
      {
        key: "is_email_verified",
        label: "Email / Contact Verified",
        sortable: false,
        style: { width: "20%" },
        render: (temp, all) => (
          <div>
            {all.is_email_verified == true ? "Yes" : "No"}
            <div>{all.is_contact_verified == true ? "Yes" : "No"}</div>
          </div>
        ),
      },
      {
        key: "createdAt",
        label: "Signup Date",
        sortable: true,
        style: { width: "15%" },
        render: (temp, all) => (
          <div>
            {all.createdAt}
            <br />
            {all.last_activity_at}
          </div>
        ),
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
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              // disabled={all.status != 'ACTIVE'}
              onClick={() => {
                handleEdit(all);
              }}
            >
              <EditIcon fontSize={"small"} className={styles.black} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [
    handleViewDetails,
    handleEdit,
    isCalling,
    renderContact,
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
          <span className={styles.title}>Customers List</span>
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
    </div>
  );
};

export default CustomerList;

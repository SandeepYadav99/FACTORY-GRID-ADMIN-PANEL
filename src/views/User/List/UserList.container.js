
/**
 * Update by sandeepelectrovese@gmail.com ->
 *  Class based Component to Function based Component 12/13/2023
 */
import React, { useCallback, useMemo } from "react";
import { Button, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Add, Info as EditIcon } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import styles from "../Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import useUserListHook from "./UserListHook";

const UserList = (props) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
   
    configFilter,
    isSidePanel,
    handleSideToggle,
    handleCreate
  } = useUserListHook({});

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.provider_user);

  const renderFirstCell = useCallback((user) => {
    const tempEmailRender = user.email ? (
      <span style={{ textTransform: "lowercase" }}>{user.email}</span>
    ) : null;
    return (
      <div className={styles.firstCellFlex}>
        <div>
          <img src={user?.image} alt="" />
        </div>
        <div className={classNames(styles.firstCellInfo, "openSans")}>
          <span>
            <div>{`${user?.name}`}</div>
          </span>
          {/*<br/>*/}
          {/*{tempEmailRender}*/}
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



  const tableStructure = useMemo(
    () => [
      {
        key: "name",
        label: "Info",
        style: { width: "15%" },
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "email",
        label: "Email",
        style: { width: "15%" },
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.email}
            <br />
         {all?.contact}
          </div>
        ),
      },
      {
        key: "designation",
        label: "Designation",
        style: { width: "15%" },
        sortable: false,
        render: (temp, all) => <div>{all?.designation}</div>,
      },
      {
        key: "role",
        label: "User Role",
        style: { width: "15%" },
        sortable: true,
        render: (temp, all) => <div>{all.role}</div>,
      },
      // Uncomment the following block if needed
      // {
      //     key: 'join_date',
      //     label: 'Join Date',
      //     style: { width: '15%'},
      //     sortable: true,
      //     render: (temp, all) => <div>{all.createdAt}</div>,
      // },
      {
        key: "status",
        label: "Status",
        style: { width: "15%" },
        sortable: true,
        render: (temp, all) => <div>{renderStatus(all.status)}</div>,
      },
      {
        key: "last_login",
        label: "Last Login",
        sortable: true,
        render: (temp, all) => (
          <div>{all.updatedAtText ? all.updatedAtText : "N/A"}</div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              // disabled={is_calling}
              onClick={()=>handleEdit(all)}
            >
              <OpenInNewIcon fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ],
    [renderFirstCell, renderStatus]
  );
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
          <span className={styles.title}>User List</span>
          <Button
            // disabled={this.state.is_calling}
            variant={"contained"}
            color={"primary"}
             onClick={handleCreate}
          >
            <Add></Add> Create
          </Button>
        </div>

        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
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
        title={"New User"}
        open={isSidePanel}
        side={"right"}
      >
        {/* {renderCreateForm()} */}
      </SidePanelComponent>
    </div>
  );
};

export default UserList;

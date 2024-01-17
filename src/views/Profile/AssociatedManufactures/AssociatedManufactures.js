/**
 * Created by sandeep.electrovese@gmail.com on 11/02/2020.
 */
import React, { Component, useCallback, useMemo } from "react";
import { Button, ButtonBase, IconButton, withStyles } from "@material-ui/core";
import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import styles from "./Style.module.css";
import classNames from "classnames";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";
import StatusPill from "../../../../components/Status/StatusPill.component";

import FilterComponent from "../../../../components/Filter/Filter.component";
import useThisYearSuccessionPlaner from "./ThisYearSuccessionPlannerHook";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import SuccessionHistory from "./SuccessionHistory/SuccessionHistory";
import SuccessionPlannerDetailform from "./SuccessionPlannerDetailform/SuccessionPlannerDetailform";
import { useSelector } from "react-redux";
import SendIcon from "@material-ui/icons/Send";
import SendPopup from "./SendDialog/SendDialog.view";
import RouteName from "../../../../routes/Route.name";
import historyUtils from "../../../../libs/history.utils";

const ThisYearSuccessionPlanner = ({ listData }) => {
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
    isSidePanel,
    handleToggleSidePannel,
    isSidePanelForm,
    handleToggleSidePannelForm,
    isCandidatesFetching,
    empId,
    handleToggleSend,
    isSend,
    handleResend,
  } = useThisYearSuccessionPlaner({ listData });

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.successionPlaner);

  const UpperInfo = useCallback(
    (obj) => {
      if (obj) {
        return (
          <div className={styles.headerContainer}>
            <div className={styles.InfoWrap}>
              <div>{"Succession History"} </div>
              <div className={styles.newLine}></div>
            </div>
          </div>
        );
      }
      return null;
    },
    [editData]
  );

  const UpperDetailFormInfo = useCallback(
    (obj) => {
      if (obj) {
        return (
          <div className={styles.headerContainer}>
            <div className={styles.InfoWrap}>
              <div>{"Add Details"} </div>
              <div className={styles.newLine}></div>
            </div>
          </div>
        );
      }
      return null;
    },
    [editData]
  );

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
        key: "employee",
        label: "EMPLOYEE",
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
        key: "doj",
        label: "D.O.J",
        sortable: false,
        render: (temp, all) => <div>{all?.doj}</div>,
      },
      {
        key: "dob",
        label: "D.O.B",
        sortable: false,
        render: (temp, all) => <div>{all?.dobText}</div>,
        //  candidate?.applied_date
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.designation?.name}</div>,
      },
      {
        key: "department",
        label: "DEPARTMENT",
        sortable: false,
        render: (temp, all) => <div>{all?.department?.name}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{all?.location?.name}</div>,
      },
      {
        key: "age",
        label: "AGE",
        sortable: false,
        render: (temp, all) => <div>{all?.age}</div>,
      },
      {
        key: "date_of_retirment",
        label: "DATE OF RETIREMENT",
        sortable: false,
        render: (temp, all) => <div>{all?.expected_dor_text}</div>,
      },
      {
        key: "annual_salary",
        label: "ANNUAL SALARY",
        sortable: false,
        render: (temp, all) => (
          <div style={{ whiteSpace: "nowrap" }}>
            {all?.annual_salary && `₹ ${all?.annual_salary}`}
          </div>
        ),
      },
      {
        key: "succession_cost_wrt_emp",
        label: "SUCCESSION'S COST WRT EMPLOYEE",
        sortable: false,
        render: (temp, all) => <div>{all?.succession_wrt}</div>,
      },
      {
        key: "nature_of_succession",
        label: "NATURE OF SUCCESSION",
        sortable: false,
        render: (temp, all) => <div><StatusPill status={all?.nature_of_succession} /></div>,
      },
      {
        key: "revert_by_date",
        label: "REVERT BY DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.last_submission_date}</div>,
      },
      {
        key: "application",
        label: "application STATUS",
        sortable: false,
        render: (temp, all) => (
          <div>{<StatusPill status={all?.application_status} />}</div>
        ),
      },
      {
        key: "Extension",
        label: "Extension STATUS",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.extension_status ? (
              <StatusPill status={all?.extension_status} />
            ) : (
              "NA"
            )}
          </div>
        ),
      },
      {
        key: "succession_status",
        label: "SUCCESSION STATUS",
        sortable: false,
        render: (temp, all) => (
          <div>{<StatusPill status={all?.succession_status} />}</div>
        ),
      },
      {
        key: "action_key",
        label: "Action",
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
            {!all?.is_succession_form_sent && (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleToggleSend(all);
                }}
              >
                <SendIcon style={{ color: "#161616" }} fontSize={"small"} />
              </IconButton>
            )}
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
      rowsPerPage: 10,
      columns: tableStructure,
      data: data,
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
    data,
    currentPage,
  ]);

  return (
    <div>
      <div>
        <div>
          <div>
            <FilterComponent
              is_progress={isFetching}
              filters={configFilter}
              handleSearchValueChange={handleSearchValueChange}
              handleFilterDataChange={handleFilterDataChange}
            />
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
        <SendPopup
          isOpen={isSend}
          handleToggle={handleToggleSend}
          handleSubmit={handleResend}
          empId={empId}
        />
        <SidePanelComponent
          handleToggle={handleToggleSidePannel}
          title={<UpperInfo />}
          open={isSidePanel}
          side={"right"}
        >
          <SuccessionHistory
            handleToggleSidePannel={handleToggleSidePannel}
            isSidePanel={isSidePanel}
            empId={empId}
          />
        </SidePanelComponent>

        <SidePanelComponent
          handleToggle={handleToggleSidePannelForm}
          title={<UpperDetailFormInfo />}
          isBack={true}
          open={isSidePanelForm}
          side={"right"}
        >
          <SuccessionPlannerDetailform
            handleToggleSidePannel={handleToggleSidePannelForm}
            isSidePanel={isSidePanelForm}
            empId={editData}
          />
        </SidePanelComponent>
      </div>
    </div>
  );
};

export default ThisYearSuccessionPlanner;

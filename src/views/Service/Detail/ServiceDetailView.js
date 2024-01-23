import {
  Avatar,
  ButtonBase,
  Card,
  CardHeader,
  makeStyles,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import historyUtils from "../../../libs/history.utils";
import styles from "../Detail/ServiceDetail/Style.module.css";
import { useLocation } from "react-router-dom";
import { Add, Check, Edit } from "@material-ui/icons";

import { serviceDetail } from "../../../services/Service.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";

import { serviceTaskMnagmentUpdateStatus } from "../../../services/TaskManage.service";
import WaitingComponent from "../../../components/Waiting.component";
// import TaskDetailHeader from "./ServiceDetailView/TaskDetailHeader";
import PillContainer from "../Detail/ServiceDetail/PillContainer";
import ServiceDescriptionContainer from "./ServiceDetail/ServiceDescriptionContainer";
import ServiceDetailContainer from "./ServiceDetail/ServiceDetailContainer";
import ServiceDetailHeader from "./ServiceDetail/ServiceDetailHeader";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import ServiceUpdateView from "./Update/UpdateDetail";

const useStyles = makeStyles((theme) => ({
  boldTitle: {
    fontWeight: "bold",
  },
  subTitle: {
    fontWeight: "normal",
    fontSize: "13px",
  },
  subHeadeer: {
    fontSize: "14px",
    color: "#000000",
    fontWeight: "600",
  },
  paragraph: {
    fontSize: "13px",
    color: "#000",
  },
}));

const ServiceDetailView = ({}) => {
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState(null);
  console.log(details, "details");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const classes = useStyles();

  const toggleAcceptDialog = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
    },
    [isAcceptPopUp]
  );

  useEffect(() => {
    setIsLoading(true);
    serviceDetail({ id: id ? id : "" }).then((res) => {
      if (!res.error) {
        const data = res?.data;
        setDetails(data);
      } else {
        SnackbarUtils.error(res.message);
      }
      setIsLoading(false);
    });
  }, [isAcceptPopUp,id]);

  const markAsCompleted = () => {
    serviceTaskMnagmentUpdateStatus({
      is_completed: true,
      id: id ? id : "",
    }).then((res) => {
      if (!res.error) {
        serviceDetail({ id: id ? id : "" }).then((res) => {
          if (!res.error) {
            const data = res?.data;
            setDetails(data);
          } else {
            SnackbarUtils.error(res.message);
          }
        });
      } else {
        SnackbarUtils.error(res.message);
      }
    });
  };

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>Service Detail</b>
            </span>
          </ButtonBase>
        </div>

        <div>
          <ButtonBase
            onClick={toggleAcceptDialog}
            className={styles.editAction}
          >
            <Edit fontSize={"small"} />
            <span>Edit</span>
          </ButtonBase>
        </div>
      </div>
      {/* <CandidateInfor empId={details?.emp_code} /> */}
      {isLoading ? (
        <WaitingComponent />
      ) : (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <ServiceDetailHeader details={details} styles={styles} />
            <PillContainer details={details} styles={styles} />
            <ServiceDetailContainer
              styles={styles}
              details={details}
              classes={classes}
            />
            <ServiceDescriptionContainer
              classes={classes}
              styles={styles}
              details={details}
            />
          </div>
        </div>
      )}
      <SidePanelComponent
        handleToggle={toggleAcceptDialog}
        title={"Update Service"}
        open={isAcceptPopUp}
        side={"right"}
      >
        <ServiceUpdateView
          handleToggleSidePannel={toggleAcceptDialog}
          isSidePanel={isAcceptPopUp}
          // empId={id}
          details={details}
        />
      </SidePanelComponent>
    </div>
  );
};

export default ServiceDetailView;

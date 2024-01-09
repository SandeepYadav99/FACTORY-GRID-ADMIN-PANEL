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
import styles from "./Style.module.css";
import { useLocation } from "react-router-dom";
import { Add, Check, Edit } from "@material-ui/icons";

import { serviceTaskManagementDetail } from "../../../services/ProviderUser.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { serviceTaskMnagmentUpdateStatus } from "../../../services/TaskManage.service";
import WaitingComponent from "../../../components/Waiting.component";
import TaskDetailHeader from "./TaskDetailView/TaskDetailHeader";
import PillContainer from "./TaskDetailView/PillContainer";
import AssignedContainer from "./TaskDetailView/AssignedContainer";
import TaskAssignedContainer from "./TaskDetailView/TaskAssignedContainer";
import AddNoteContainer from "./NotesDilog/AddNoteContainer";

const useStyles = makeStyles((theme) => ({
  boldTitle: {
    fontWeight: "bold",
  },
  subTitle: {
    fontWeight: "normal",
    fontSize: "13px",
  },
  paragraph: {
    fontSize: "13px",
    color: "#000",
  },
}));
const TaskDetailView = ({}) => {
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    serviceTaskManagementDetail({ id: id ? id : "" }).then((res) => {
      if (!res.error) {
        const data = res?.data;
        setDetails(data);
      } else {
        SnackbarUtils.error(res.message);
      }
      setIsLoading(false);
    });
  }, [id]);

  const toggleAcceptDialog = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
    },
    [isAcceptPopUp]
  );

  const markAsCompleted = () => {
    serviceTaskMnagmentUpdateStatus({
      is_completed: true,
      id: id ? id : "",
    }).then((res) => {
      if (!res.error) {
      
        serviceTaskManagementDetail({ id: id ? id : "" }).then((res) => {
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

  const completedHandler = () => {
    serviceTaskMnagmentUpdateStatus({
      is_completed: false,
      id: id ? id : "",
    }).then((res) => {
      if (!res.error) {
        serviceTaskManagementDetail({ id: id ? id : "" }).then((res) => {
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
              <b>Task Detail</b>
            </span>
          </ButtonBase>
        </div>

        <div>
          <ButtonBase onClick={()=>{}}>
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
            <TaskDetailHeader
              details={details}
              markAsCompleted={markAsCompleted}
              styles={styles}
              completedHandler={completedHandler}
            />
            <PillContainer details={details} styles={styles} />
            <AssignedContainer
              styles={styles}
              details={details}
              classes={classes}
            />
            <TaskAssignedContainer
              classes={classes}
              styles={styles}
              details={details}
            />
          </div>
        </div>
      )}
      <AddNoteContainer
        details={details}
        styles={styles}
        classes={classes}
        toggleAcceptDialog={toggleAcceptDialog}
        isAcceptPopUp={isAcceptPopUp}
      />
    </div>
  );
};

export default TaskDetailView;

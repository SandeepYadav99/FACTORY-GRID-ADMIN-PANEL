import { ButtonBase, makeStyles } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import historyUtils from "../../../libs/history.utils";
import styles from "./Style.module.css";
import { useLocation } from "react-router-dom";
import { Edit } from "@material-ui/icons";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { serviceTaskMnagmentUpdateStatus } from "../../../services/TaskManage.service";
import TaskDetailHeader from "./TaskDetailView/TaskDetailHeader";
import PillContainer from "./TaskDetailView/PillContainer";
import AssignedContainer from "./TaskDetailView/AssignedContainer";
import TaskAssignedContainer from "./TaskDetailView/TaskAssignedContainer";
import AddNoteContainer from "./NotesDilog/AddNoteContainer";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import AddTaskUpdate from "./Update/UpdateDetail";
import { useDispatch, useSelector } from "react-redux";
import { actionTaskManagementDetail } from "../../../actions/Common.action";
import WaitingComponent from "../../../components/Waiting.component";
import { serviceTaskManagementDetail } from "../../../services/ProviderUser.service";

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

const TaskDetailView = ({}) => {
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const classes = useStyles();
  const [isSidePanel, setSidePanel] = useState(false);
  const dispatch = useDispatch();
  const [details, setDetails] = useState(null);
  // const { present: details } = useSelector((state) => state.common);

  const toggleAcceptDialog = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
    },
    [isAcceptPopUp]
  );

  const fetchTaskDetails = useCallback(() => {
    setTimeout(()=>{
      serviceTaskManagementDetail({ id: id }).then((res) => {
        if (!res?.error) {
          setDetails(res?.data);
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    },2000)
  }, [id]);


  const markAsCompleted = useCallback(() => {
    serviceTaskMnagmentUpdateStatus({
      is_completed: true,
      id: id ? id : "",
    }).then((res) => {
      if (!res.error) {
     
        // setDetails((prevDetails) => ({ ...prevDetails, is_completed: true }));
        setTimeout(()=>{
          fetchTaskDetails()

        },3000)
      } else {
        SnackbarUtils.error(res.message);
      }
    });
  }, [id]);
  
  const completedHandler = useCallback(() => {
    serviceTaskMnagmentUpdateStatus({
      is_completed: false,
      id: id ? id : "",
    }).then((res) => {
      if (!res.error) {
        setTimeout(()=>{
          fetchTaskDetails()

        },3000)
      } else {
        SnackbarUtils.error(res.message);
      }
    });
  }, [id]);
  


  useEffect(()=>{
    fetchTaskDetails()
  },[id, isSidePanel])

    const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
    },
    [setSidePanel] // , profileId, id,  userObject?.user?.id
  );
  // if (!details && !isSidePanel) {
  //   return <WaitingComponent />;
  // }
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

        <div className={styles.editAction}>
          <ButtonBase onClick={handleSideToggle}>
            <Edit fontSize={"small"} />
            <span>Edit</span>
          </ButtonBase>
        </div>
      </div>

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
      {/* )} */}
      <AddNoteContainer
        details={details}
        styles={styles}
        classes={classes}
        toggleAcceptDialog={toggleAcceptDialog}
        isAcceptPopUp={isAcceptPopUp}
      />

      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={"Create Update Task"}
        open={isSidePanel}
        side={"right"}
      >
        <AddTaskUpdate
          handleSideToggle={handleSideToggle}
          isSidePanel={isSidePanel}
          empId={id}
          details={details}
        />
      </SidePanelComponent>
    </div>
  );
};

export default TaskDetailView;

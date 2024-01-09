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
import NotesDilog from "./components/NotesDilog/NotesDilog";
import { serviceTaskManagementDetail } from "../../../services/ProviderUser.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";

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
  console.log(details, "FE");
  useEffect(() => {
    // setIsLoading(true);
    serviceTaskManagementDetail({ id: id ? id : "" }).then((res) => {
      if (!res.error) {
        const data = res?.data;
        setDetails(data);
      } else {
        SnackbarUtils.error(res.message);
      }
      //  setIsLoading(false);
    });
  }, [id]);

  const toggleAcceptDialog = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
    },
    [isAcceptPopUp]
  );

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
          <ButtonBase>
            <Edit fontSize={"small"} />
            <span>Edit</span>
          </ButtonBase>
        </div>
      </div>
      {/* <CandidateInfor empId={details?.emp_code} /> */}
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.headerTitle}>
            <div className={styles.subTitle}>{details?.title}</div>
            <div className={styles.complte}>
              <ButtonBase>
                <Check fontSize={"small"} />
                <span>Mark as Complete</span>
              </ButtonBase>
            </div>
          </div>
          <div className={styles.paragraph}>{details?.description}</div>
          <div className={styles.gaps} />
          <div className={styles.pillContainer}>
            <div className={styles.priority}>{details?.priority}</div>
            <div className={styles.section}>{details?.type}</div>
          </div>
          <div className={styles.gaps} />
          <div className={styles.mainFlex}>
            {/* <div className={styles.gaps} /> */}
            <div className={styles.backgroundStatus}>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>Due Date:</div>{" "}
                {/* Avator  */}
                <div>
                  <CardHeader subheader={details?.dueDateText} />
                </div>
              </div>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>Assigned To:</div>{" "}
                {/* Avator  */}
                <div>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="User Avatar"
                        src={details?.assignedTo?.image}
                      ></Avatar>
                    }
                    title={
                      <a className={classes.boldTitle} href="#">
                        {details?.assignedTo?.name}
                      </a>
                    }
                  />
                </div>
              </div>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>Assigned By:</div>{" "}
                {/* Avator  */}
                <div>
                  <CardHeader
                    avatar={<Avatar src={details?.assignedBy?.image}></Avatar>}
                    title={
                      <a className={classes.boldTitle} href="#">
                        {details?.assignedBy?.name}
                      </a>
                    }
                  />
                </div>
              </div>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>Task Type:</div>{" "}
                {/* Avator  */}
                <div>
                  <CardHeader subheader={details?.type} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mainFlex}>
            {/* <div className={styles.gaps} /> */}
            <div className={styles.backgroundStatus1}>
              <div className={styles.getfiledSpace}>
                {/* Avator  */}
                <div>
                  <CardHeader
                    title={
                      <span className={classes.subTitle}>
                        Task assigned on:
                      </span>
                    }
                    subheader={
                      <p className={classes.paragraph}>
                        {" "}
                        {details?.assignedOnText}
                      </p>
                    }
                  />
                </div>
              </div>
              <div className={styles.getfiledSpace}>
                {/* Avator  */}
                <div>
                  <CardHeader
                    title={
                      <span className={classes.subTitle}>
                        Task completed on:
                      </span>
                    }
                    subheader={details?.completedOnText} // September 14, 2016
                  />
                </div>
              </div>
            </div>
            <div className={styles.backgroundStatus1}>
              <div className={styles.getfiledSpace}>
                {/* Avator  */}
                <div>
                  <CardHeader
                    title={
                      <span className={classes.subTitle}>Associated User</span>
                    }
                    subheader={
                      <b>
                        {" "}
                        {`${details?.associatedUser?.first_name} ${details?.associatedUser?.last_name}`}
                      </b>
                    }
                  />
                </div>
              </div>
            </div>
            <div className={styles.backgroundStatus1}>
              <div className={styles.getfiledSpace}>
                {/* Avator  */}

                <CardHeader
                  title={
                    <span className={classes.subTitle}>Associated Task</span>
                  }
                  subheader={
                    <a href="#" style={{ fontSize: "13px" }}>
                      Task management view
                    </a>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.notesContainer}>
            <div className={styles.title}>Notes</div>
            <div>
              <ButtonBase
                className={styles.addTask}
                onClick={toggleAcceptDialog}
              >
                <div>
                  <Add fontSize={"small"} />
                </div>
                <div className={styles.innerText}>Add Note</div>
              </ButtonBase>
            </div>
          </div>
          <div className={styles.mainFlex}>
            <div>
              <div style={{ marginLeft: "15px" }}>
                Notes entered will be displayed here. Notes entered will be
                displayed here
              </div>
              <Card>
                <CardHeader
                  avatar={<Avatar>R</Avatar>}
                  title={<span className={classes.boldTitle}>Pranav</span>}
                  subheader="September 14, 2016"
                />
              </Card>
            </div>
            <div className={styles.gaps} />
            <div>
              <div style={{ marginLeft: "15px" }}>
                Notes entered will be displayed here. Notes entered will be
                displayed here
              </div>
              <Card>
                <CardHeader
                  avatar={<Avatar>R</Avatar>}
                  title={<span className={classes.boldTitle}>Pranav</span>}
                  subheader="September 14, 2016"
                />
              </Card>
            </div>
            {/* Dilog Box nots */}
            <NotesDilog
              isOpen={isAcceptPopUp}
              handleToggle={toggleAcceptDialog}
            />
            {/*  empId={empId}
        suspendItem={suspendItem} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailView;

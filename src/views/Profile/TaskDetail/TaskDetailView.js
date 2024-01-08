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
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Add } from "@material-ui/icons";
import NotesDilog from "./components/NotesDilog/NotesDilog";


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
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    //  setIsLoading(true);
    // serviceEmployeeBGVDetail({ id: id }).then((res) => {
    //   if (!res.error) {
    //     const data = res?.data;
    //     setDetails({
    //       ...details,
    //       is_education_verification_status:
    //         data?.is_education_verification_status,
    //       is_first_employment_verification_status:
    //         data?.is_first_employment_verification_status,
    //       is_secound_employment_verification_status:
    //         data?.is_secound_employment_verification_status,
    //       is_criminal_verification_status:
    //         data?.is_criminal_verification_status,
    //       bgv_status: data?.bgv_status,
    //       bgv_result: data?.bgv_result,
    //       payment_status: data?.payment_status,
    //       paymentCompleteText: data?.paymentCompleteText,
    //       billing_to: data?.billing_to,
    //       cost: data?.cost,
    //       choose_action: data?.choose_action,
    //       remark: data?.remark,
    //       emp_code: data?.employeeObj?.emp_code,
    //       action_remark: data?.action_remark,
    //     });
    //   } else {
    //     SnackbarUtils.error(res.message);
    //   }
    //   // setIsLoading(false);
    // });
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
      </div>
      {/* <CandidateInfor empId={details?.emp_code} /> */}
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.subTitle}>
            Create view for Admin User Task Management
          </div>
          <div className={styles.paragraph}>
            Follow admin profile view to create a Task List and task creation
            form
          </div>
          <div className={styles.gaps} />
          <div className={styles.pillContainer}>
            <div className={styles.priority}>HIGH</div>
            <div className={styles.section}>Finance</div>
          </div>
          <div className={styles.gaps} />
          <div className={styles.mainFlex}>
            {/* <div className={styles.gaps} /> */}
            <div className={styles.backgroundStatus}>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>Assigned To:</div>{" "}
                {/* Avator  */}
                <div>
                  <CardHeader
                    avatar={<Avatar>R</Avatar>}
                    title={<span className={classes.boldTitle}>Pranav</span>}
                    subheader="September 14, 2016"
                  />
                </div>
              </div>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>Assigned By:</div>{" "}
                {/* Avator  */}
                <div>
                  <CardHeader
                    avatar={<Avatar>R</Avatar>}
                    title={<span className={classes.boldTitle}>Pranav</span>}
                    subheader="September 14, 2016"
                  />
                </div>
              </div>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>Task Type:</div>{" "}
                {/* Avator  */}
                <div>
                  <CardHeader
                    avatar={<Avatar>R</Avatar>}
                    title={<span className={classes.boldTitle}>Pranav</span>}
                    subheader="September 14, 2016"
                  />
                </div>
              </div>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>Due Date:</div>{" "}
                {/* Avator  */}
                <div>
                  <CardHeader
                    avatar={<Avatar>R</Avatar>}
                    title={<span className={classes.boldTitle}>Pranav</span>}
                    subheader="September 14, 2016"
                  />
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
                        26/12/2023 | 16:15 PM
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
                        Task assigned on:
                      </span>
                    }
                    subheader="" // September 14, 2016
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
                    subheader={<b> Abhishek Singh</b>}
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
              <ButtonBase className={styles.addTask} onClick={toggleAcceptDialog}>
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

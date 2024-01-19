import { CardHeader } from "@material-ui/core";
import React, { memo } from "react";
import RouteName from "../../../../routes/Route.name";

const TaskAssignedContainer = ({ styles, details, classes }) => {
  return (
    <div className={styles.mainFlex}>
      {/* <div className={styles.gaps} /> */}
      <div className={styles.backgroundStatus1}>
        <div className={styles.getfiledSpace}>
          {/* Avator  */}
          <div>
            <CardHeader
              title={
                <span className={classes.subTitle}>Task assigned on:</span>
              }
              subheader={details?.assignedOnDetailText}
            />
          </div>
        </div>
        <div className={styles.getfiledSpace}>
          {/* Avator  */}
          <div>
            <CardHeader
              title={
                <span className={classes.subTitle}>Task completed on:</span>
              }
              subheader={details?.completedOnText} // completedOnText
            />
          </div>
        </div>
      </div>
      <div className={styles.backgroundStatus1}>
        <div className={styles.getfiledSpace}>
          {/* Avator  */}
          <div>
            <CardHeader
              title={<span className={classes.subTitle}>Associated User</span>}
              subheader={
                <a  href={"#"} style={{fontWeight:"500"}}>
                  {/* `${"/profile/"}?id=${details?.associatedUser?.id}` */}

                  {details?.associatedUser?.first_name
                    ? `${details?.associatedUser?.first_name} ${details?.associatedUser?.last_name}`
                    : "N/A"}
              
                </a>
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.backgroundStatus1}>
        <div className={styles.getfiledSpace}>
          {/* Avator  */}

          <CardHeader
            title={<span className={classes.subTitle}>Associated Task</span>}
            subheader={
              <a
                href={`${RouteName.TASK_DETAIL}?id=${details?.associatedTask?._id}`}
                style={{ fontSize: "13px" }}
              >
               {details?.associatedTask?.title || "N/A"}
              </a>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default memo(TaskAssignedContainer);

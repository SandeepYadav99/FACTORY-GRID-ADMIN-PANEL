import { CardHeader } from "@material-ui/core";
import React, { memo } from "react";

const TaskAssignedContainer = ({ styles, details, classes }) => {
  return (
    <div>
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
                title={
                  <span className={classes.subTitle}>Associated User</span>
                }
                subheader={
                  <div className={classes.subHeadeer}>
                    {details?.associatedUser?.first_name
                      ? `${details?.associatedUser?.first_name} ${details?.associatedUser?.last_name}`
                      : "N/A"}
                  </div>
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
                <a href={`${"/profile/"}?id=${details?.assignedTo?.id}`} style={{ fontSize: "13px" }}>
                  Task management view
                </a>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TaskAssignedContainer);

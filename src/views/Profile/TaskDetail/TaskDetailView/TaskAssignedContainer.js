import { Avatar, CardHeader } from "@material-ui/core";
import React, { memo } from "react";
import RouteName from "../../../../routes/Route.name";
import capitalizeFirstLetter from "../../../../hooks/CommonFunction";

const TaskAssignedContainer = ({ styles, details, classes }) => {
console.log(details?.completedOnText)
  return (
    <div className={styles.mainFlex}>
      {/* <div className={styles.gaps} /> */}
      <div className={styles.backgroundStatus1} style={{ width: details?.completedOnText === 'N/A' ? '44%' : '50%' }}>
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
          <div >
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
                <div style={{ display: "flex", alignItems: "center" }}>
                    {details?.associatedUser?.name ? 
                    <>
                  <Avatar
                    className={classes.avatar}
                    src={details?.associatedUser?.image}
                  >
                    {details?.associatedUser?.name
                      ? details?.associatedUser?.name[0].toUpperCase()
                      : "N/A"}
                  </Avatar>
                 <a
                    href={ `/profile/?id=${details?.associatedUser?.id}`
                        
                    }
                  >
                    {capitalizeFirstLetter(details?.associatedUser?.name)
                     }
                  </a>
                    </> : "N/A"}
                 
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
              <div>
                {details?.associatedTask?.title ? (
                  <a
                    href={`${RouteName.TASK_DETAIL}${details?.associatedTask?._id}`}
                    style={{ fontSize: "13px" }}
                  >
                    {details?.associatedTask?.title}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default memo(TaskAssignedContainer);

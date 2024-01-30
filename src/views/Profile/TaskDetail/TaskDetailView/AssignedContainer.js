import { Avatar, CardHeader } from "@material-ui/core";
import React, { memo } from "react";
import StatusPill from "../../../../components/Status/StatusPill.component";

const AssignedContainer = ({ details, styles, classes }) => {
  return (
    <div className={styles.mainFlex}>
      <div className={styles.backgroundStatus}>
        <div className={styles.getfiledSpace}>
          <div className={styles.titleFiledSpace}>Due Date:</div>{" "}
        
          <div>
            <CardHeader subheader={details?.dueDateText} />
          </div>
        </div>
        <div className={styles.getfiledSpace}>
          <div className={styles.titleFiledSpace}>Assigned To:</div>{" "}
        
          <div>
            <CardHeader
              avatar={
                <Avatar
                  alt="User Avatar"
                  src={details?.assignedTo?.image}
                  style={{ width: "40px", height: "40px" }}
                ></Avatar>
              }
              title={
                <a
                  className={classes.boldTitle}
                  href={`${"/profile/"}?id=${details?.assignedTo?.id}`}
                >
                  {details?.assignedTo?.name}
                </a>
              }
            />
          </div>
        </div>
        <div className={styles.getfiledSpace}>
          <div className={styles.titleFiledSpace}>Assigned By:</div>{" "}
       
          <div>
            <CardHeader
              avatar={<Avatar src={details?.assignedBy?.image}></Avatar>}
              title={
                <a
                  className={classes.boldTitle}
                  href={`${"/profile/"}?id=${details?.assignedBy?.id}`}
                >
                  {details?.assignedBy?.name}
                </a>
              }
            />
          </div>
        </div>
        <div className={styles.getfiledSpace}>
          <div className={styles.titleFiledSpace}>Task Category:</div>{" "}
        
          <CardHeader
            subheader={
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#000000",
                }}
              >
                {details?.category?.map((cat, index) => (
                  <span key={index}>
                    <StatusPill
                      status={cat}
                      style={{ backgroundColor: "blue", color: "white" }}
                    />
                    {index < details.category.length - 1 && " , "}
                  </span>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default memo(AssignedContainer);

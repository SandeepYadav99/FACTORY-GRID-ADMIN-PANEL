import { ButtonBase } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import React, { useState } from "react";

const TaskDetailHeader = ({
  details,
  completedHandler,
  markAsCompleted,
  styles,
  
}) => {

  const handleButtonClick = () => {
    if (details?.is_completed) {
      completedHandler();
    } else {
      markAsCompleted();
    }
    // setIsCompleted(!isCompleted);
  };
  return (
  
      <div className={styles.headerTitle}>
        <div className={styles.subTitle}>{details?.title}</div>
        <div className={styles.complte}>
        <div  className={`${styles.transition} ${
          details?.is_completed ? styles.completed : styles.markComplete
        }`}>
        <ButtonBase onClick={handleButtonClick}>
          <Check fontSize={"small"} />
          <span>{details?.is_completed ? " Completed" : "Mark as Complete"}</span>
        </ButtonBase>
      </div>
        </div>
      </div>
   
 
  );
};

export default React.memo(TaskDetailHeader);

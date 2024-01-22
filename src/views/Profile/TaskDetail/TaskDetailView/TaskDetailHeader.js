import { ButtonBase } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import React, { useState } from "react";

const TaskDetailHeader = ({
  details,
  completedHandler,
  markAsCompleted,
  styles,
  
}) => {
  const [isCompleted, setIsCompleted] = useState(details?.is_completed);

  const handleButtonClick = () => {
    if (isCompleted) {
      completedHandler();
    } else {
      markAsCompleted();
    }
    setIsCompleted(!isCompleted);
  };
  return (
  
      <div className={styles.headerTitle}>
        <div className={styles.subTitle}>{details?.title}</div>
        <div className={styles.complte}>
        <div  className={`${styles.transition} ${
          isCompleted ? styles.completed : styles.markComplete
        }`}>
        <ButtonBase onClick={handleButtonClick}>
          <Check fontSize={"small"} />
          <span>{isCompleted ? " Completed" : "Mark as Complete"}</span>
        </ButtonBase>
      </div>
        </div>
      </div>
   
 
  );
};

export default React.memo(TaskDetailHeader);

import { ButtonBase } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import React from "react";

const TaskDetailHeader = ({
  details,
  completedHandler,
  markAsCompleted,
  styles,
}) => {
  return (
    <>
      <div className={styles.headerTitle}>
        <div className={styles.subTitle}>{details?.title}</div>
        <div className={styles.complte}>
          {details?.is_completed ? (
            <div className={styles.complted}>
              <ButtonBase onClick={completedHandler}>
                <Check fontSize={"small"} />
                <span> Completed</span>
              </ButtonBase>
            </div>
          ) : (
            <div className={styles.markComplte}>
              <ButtonBase onClick={markAsCompleted}>
                <Check fontSize={"small"} />
                <span>Mark as Complete</span>
              </ButtonBase>
            </div>
          )}
        </div>
      </div>
      <div className={styles.paragraph}>{details?.description}</div>
      <div className={styles.gaps} />
    </>
  );
};

export default React.memo(TaskDetailHeader);

import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "./Styles.module.css";
import { AccessTime, Watch } from "@material-ui/icons";

const TaskListItem = ({
  task,
  handleDetailPage,
  markAsCompleted,
  completedHandler,
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "#FF0000";
      case "MEDIUM":
        return "#FA8B55";
      case "LOW":
        return "#15F205";
      default:
        return "#FFFFFF";
    }
  };

  const handleCheckboxClick = async (e) => {
    if (e.target.checked) {
      await markAsCompleted(task);
    } else {
      await completedHandler(task);
    }
  };
  const formattedDescription = task?.description
  ? task.description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
  : null;
  return (
    <div>
      <div className={styles.check}>
        <Checkbox
          color="primary"
          checked={task?.is_completed ? true : false}
          onClick={handleCheckboxClick}
          
        />
        <div onClick={() => handleDetailPage(task)} >

        {task?.title}
        </div>
      </div>
      <div onClick={() => handleDetailPage(task)} className={styles.detailView}>
        <div className={styles.dummy}>{formattedDescription}</div>

        <div className={styles.taskFlex}>
          <div className={styles.timeFlex}>
            <AccessTime className={styles.contactIcons} fontSize="small" />
            <span className={styles.info}>{task?.dueDateListText}</span>
          </div>
          <div
            className={styles.priority}
            style={{ backgroundColor: getPriorityColor(task?.priority) }}
          >
            {task?.priority}
          </div>
          <div className={styles.section}>{task?.type}</div>
        </div>
        <hr className={styles.lines}/>
      </div>
    </div>
  );
};

export default React.memo(TaskListItem);

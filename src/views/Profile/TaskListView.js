import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import EmailIcon from '@material-ui/icons/Email';
import styles from './Styles.module.css'; // Replace with the actual import for your styles

const TaskListItem = ({ task, handleDetailPage }) => {
  return (
    <div onClick={() => handleDetailPage(task)} className={styles.detailView}>
      <div className={styles.check}>
        <Checkbox color="primary" />
        {task?.title}
      </div>
      <div className={styles.dummy}>{task?.description}</div>

      <div className={styles.taskFlex}>
        <div className={styles.timeFlex}>
          <EmailIcon className={styles.contactIcons} />
          <span className={styles.info}>{task?.dueDateText}</span>
        </div>
        <div className={styles.priority}>{task?.priority}</div>
        <div className={styles.section}>{task?.type}</div>
      </div>
      <div className={styles.gaps} />
    </div>
  );
};

export default React.memo(TaskListItem);

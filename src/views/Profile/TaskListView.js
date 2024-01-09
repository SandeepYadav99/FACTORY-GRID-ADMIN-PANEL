import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './Styles.module.css'; 
import { AccessTime, Watch } from '@material-ui/icons';

const TaskListItem = ({ task, handleDetailPage }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return '#FF0000';
      case 'MEDIUM':
        return '#FA8B55';
      case 'LOW':
        return '#15F205';
      default:
        return '#FFFFFF'; 
    }
  };
  
  return (
    <div onClick={() => handleDetailPage(task)} className={styles.detailView}>
      <div className={styles.check}>
        <Checkbox color="primary" />
        {task?.title}
      </div>
      <div className={styles.dummy}>{task?.description}</div>

      <div className={styles.taskFlex}>
        <div className={styles.timeFlex}>
          <AccessTime className={styles.contactIcons} fontSize='small'/>
          <span className={styles.info}>{task?.dueDateText}</span>
        </div>
        <div className={styles.priority} style={{ backgroundColor: getPriorityColor(task?.priority) }}>{task?.priority}</div>
        <div className={styles.section}>{task?.type}</div>
      </div>
      <div className={styles.gaps} />
    </div>
  );
};

export default React.memo(TaskListItem);

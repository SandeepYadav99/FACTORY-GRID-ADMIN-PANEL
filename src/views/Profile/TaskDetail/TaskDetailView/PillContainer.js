import React, { memo } from "react";

const PillContainer = ({ details, styles }) => {
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
    <div>
      {" "}
      <div className={styles.pillContainer}>
        <div className={styles.priority} style={{ backgroundColor: getPriorityColor(details?.priority) }}>{details?.priority}</div>
        <div className={styles.section}>{details?.type}</div>
      </div>
      <div className={styles.des}>Description:</div> 
      <div className={styles.paragraph}>{details?.description}</div>
      
      <div className={styles.gaps} />
    </div>
  );
};

export default memo(PillContainer);

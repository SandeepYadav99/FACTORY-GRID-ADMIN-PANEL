import React, { memo } from "react";

const ServiceDetailHeader = ({ details, styles }) => {
  const getstatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return '#008000';
      case 'INACTIVE':
        return '#FF0000';
    
      default:
        return '#FFFFFF'; 
    }
  };
  return (
    <div>
      {" "}
      <div className={styles.pillContainer}>
        <div className={styles.status} style={{ backgroundColor: getstatusColor(details?.status) }}>{details?.status}</div>
        <div className={styles.section}>{details?.type}</div>
      </div>
      <div className={styles.gaps} />
    </div>
  );
};

export default memo(ServiceDetailHeader);

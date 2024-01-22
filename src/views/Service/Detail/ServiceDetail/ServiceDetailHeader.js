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
      <div className={styles.headerTitle}>
        <div  style={{ backgroundColor: getstatusColor(details?.status) }}>{details?.status}</div>
       
      </div>
      <div className={styles.gaps} />
    </div>
  );
};

export default memo(ServiceDetailHeader);

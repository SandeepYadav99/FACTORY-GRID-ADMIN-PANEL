import React, { memo } from "react";

const ServiceDetailHeader = ({ details, styles }) => {
  const getstatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'white';
      case 'INACTIVE':
        return 'white';
    
      default:
        return '#FFFFFF'; 
    }
  };
  return (
    <div>
      {" "}
      <div className={styles.headerTitle}>
        <div  style={{ backgroundColor: getstatusColor(details?.status), color: "#32de84" }}>{details?.status}</div>
       
      </div>
      <div className={styles.gaps} />
    </div>
  );
};

export default memo(ServiceDetailHeader);

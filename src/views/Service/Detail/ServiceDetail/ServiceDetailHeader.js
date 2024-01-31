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
        <div  style={{ backgroundColor: getstatusColor(details?.status),  fontSize: "20px",
      color: "#20c997",
      background: "rgba(32,201,151,.1)",
      padding: "3px 10px",
      borderRadius: "20px",
      textTransform: "capitalize", }}>{details?.status}</div>
       
      </div>
      <div className={styles.gaps} />
    </div>
  );
};

export default memo(ServiceDetailHeader);

import React, { memo } from "react";
import classNames from "classnames";
const PillContainer = ({ details, styles }) => {

  return (
    <div>
      {" "}
      <div className={styles.container} >
        <div>
          <img src={details?.logo} height={40} alt="" />
        </div>
        <div className={classNames(styles.gaps, "openSans")}>
        <div>
          <div style={{fontSize:"20px", color:"#000000"}}>{`${details?.name} `}</div>
        </div>
       
          <br />
         
        </div>
      </div>


     
      <div className={styles.gaps} />
    </div>
  );
};

export default memo(PillContainer);

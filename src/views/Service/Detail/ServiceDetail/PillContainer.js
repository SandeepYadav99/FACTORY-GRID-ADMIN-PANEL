import React, { memo } from "react";
import classNames from "classnames";
const PillContainer = ({ details, styles }) => {

  return (
    <div>
      {" "}
      <div className={styles.container} >
        <div>
          <img src={details?.logo} height={30} alt="" />
        </div>
        <div className={classNames(styles.gaps, "openSans")}>
          <span>
            <strong>{`${details?.name}`}</strong>
          </span>{" "}
          <br />
         
        </div>
      </div>


     
      <div className={styles.gaps} />
    </div>
  );
};

export default memo(PillContainer);

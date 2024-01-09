import React, { memo } from "react";

const PillContainer = ({ details, styles }) => {
  return (
    <div>
      {" "}
      <div className={styles.pillContainer}>
        <div className={styles.priority}>{details?.priority}</div>
        <div className={styles.section}>{details?.type}</div>
      </div>
      <div className={styles.gaps} />
    </div>
  );
};

export default memo(PillContainer);

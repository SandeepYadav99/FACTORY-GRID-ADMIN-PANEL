import React from 'react';
import styles from './Style.module.css';
import { ButtonBase } from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";

const Queries = ({queryLists}) => {
    console.log(queryLists, "Querylist is ");

  const renderTimeline = () => {

    return queryLists?.map((queryList) => {
      const updatedAt = new Date(queryList?.createdAt);
      const updatedAtFormatted = updatedAt.toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      const updatedMonth= updatedAt.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
       
      });

      return (
        <div className={styles.queryFlex} key={queryList?.id}>
          <div className={styles.timelineFlex}>
            <div className={styles.date}>
             {updatedMonth}
            </div>
            <div className={styles.totalTimeline}>
              <div className={styles.caseFlex}>
                {/* <div className={styles.weight}>CASE ID </div> */}
                <div className={styles.weight}>CASE ID: {queryList?.support_no || "N/A"} </div>
               
                <div className={styles.status}>{queryList?.status}</div>
              </div>
              {/* <div className={styles.weight}>12/10/2021 | 1.00 PM</div> */}
              <div className={styles.weight}>{updatedAtFormatted}</div>
              <div className={styles.weight}>Call Concern: {queryList?.concern}</div> 
              {/* // Call Concern */}
              <div>Last Updated: {queryList?.updatedAt || "N/A"}</div>
            </div>
          </div>
          <div className={styles.rightArrow}>
            <KeyboardArrowRight fontSize={'large'}/>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.activityContainer}>
      <div className={styles.upperFlex}>
        <div className={styles.total}>Total: 0</div>
        <div className={styles.total}>Unresolved: 0</div>
        <div className={styles.total}>Resolved: 0</div>
      </div>
      <div>{renderTimeline()}</div>
      <div className={styles.viewBtn}>
        <ButtonBase className={styles.viewMore}>View All</ButtonBase>
      </div>
    </div>
  );
};

export default Queries;

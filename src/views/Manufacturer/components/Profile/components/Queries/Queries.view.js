import React from 'react';
import styles from './Style.module.css';
import { ButtonBase } from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";
import history from '../../../../../../libs/history.utils';

const Queries = ({queryLists, supportQueryCount}) => {
    console.log(supportQueryCount, "Querylist is ");

  const renderTimeline = () => {

    const customerSupport = (support_id)=>{
      history.push(`${"/support/detail/"}${support_id}`)
    }
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
          <div className={styles.rightArrow} onClick={()=>customerSupport(queryList?._id)}>
            <KeyboardArrowRight fontSize={'large'}/>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.activityContainer}>
      <div className={styles.upperFlex}>
        <div className={styles.total}>Total: {supportQueryCount?.tatalQuery}</div>
        <div className={styles.total}>Unresolved: {supportQueryCount?.unResolved}</div>
        <div className={styles.total}>Resolved: {supportQueryCount?.resolved}</div>
      </div>
      {queryLists?.length > 0 ? <div>

      <div>{renderTimeline()}</div>
      <div className={styles.viewBtn}>
        <ButtonBase className={styles.viewMore}>View All</ButtonBase>
      </div>

      </div>
      :<div className={styles.query}>Not Available</div>}
    </div>
  );
};

export default Queries;

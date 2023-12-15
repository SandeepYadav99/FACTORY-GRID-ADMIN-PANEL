import React from 'react'
import styles from "./style.module.css";
import InboxIcon from "@material-ui/icons/Inbox";
import { ButtonBase } from '@material-ui/core';
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
const ActivityInfo = () => {
  return (
    <div className={styles.rightSection}>
    <div className={styles.plain}>
      <div className={styles.upperFlex}>
        <h3 className={styles.taskHeading}>Activity Info </h3>
      </div>
      <hr />
      <div>
        <ul className={styles.activityList}>
          <li className={styles.activityList_single}>
            <span className={styles.activityIcon}>
              <InboxIcon className={styles.activeIcon} />
            </span>
            <div className={styles.activityContent}>
              <div className={styles.activityInfo}>
                <img
                  src={require("../../../../../assets/img/a.jpg")}
                  height={40}
                  width={40}
                  className={styles.icon}
                  alt=""
                />
                <p className={styles.information}>
                  <span className={styles.nameActivity}>James</span> Send
                  you a message
                  <div className={styles.hours}>5 hours ago</div>
                </p>
              </div>

              <ButtonBase>
                <MoreHorizIcon className={styles.horizontalDots} />
              </ButtonBase>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default ActivityInfo
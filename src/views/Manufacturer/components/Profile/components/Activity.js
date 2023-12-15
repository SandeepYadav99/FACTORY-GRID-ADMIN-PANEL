import React from 'react'
import styles from './AccountQuality.module.css'
import Timeline from "../components/Timeline/Timeline.view";
const Activity = () => {
  return (
    <div className={styles.plain}>
    <div className={styles.activityFlex}>
      <div className={styles.headings}>Activity</div>
      <div className={styles.latest}>
        <strong>Latest Activity</strong> : 12/2/21 12:00:00
      </div>
    </div>
    <Timeline />
  </div>
  )
}

export default Activity
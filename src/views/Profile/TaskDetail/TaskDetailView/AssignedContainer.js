import { Avatar, CardHeader } from '@material-ui/core'
import React, { memo } from 'react'
import RouteName from '../../../../routes/Route.name'
import history from '../../../../libs/history.utils'

const AssignedContainer = ({details, styles, classes}) => {
 
  return (
    <div><div className={styles.mainFlex}>
    {/* <div className={styles.gaps} /> */}
    <div className={styles.backgroundStatus}>
      <div className={styles.getfiledSpace}>
        <div className={styles.titleFiledSpace}>Due Date:</div>{" "}
        {/* Avator  */}
        <div>
          <CardHeader subheader={details?.dueDateText} />
        </div>
      </div>
      <div className={styles.getfiledSpace}>
        <div className={styles.titleFiledSpace}>Assigned To:</div>{" "}
        {/* Avator  */}
        <div>
          <CardHeader
            avatar={
              <Avatar
                alt="User Avatar"
                src={details?.assignedTo?.image}
              ></Avatar>
            }
            title={
              <a className={classes.boldTitle} href={`${"/profile/"}?id=${details?.assignedTo?.id}`}>
                {details?.assignedTo?.name}
              </a>
            }
          />
        </div>
      </div>
      <div className={styles.getfiledSpace}>
        <div className={styles.titleFiledSpace}>Assigned By:</div>{" "}
        {/* Avator  */}
        <div>
          <CardHeader
            avatar={
              <Avatar src={details?.assignedBy?.image}></Avatar>
            }
            title={
              <a className={classes.boldTitle} href={`${"/profile/"}?id=${details?.assignedBy?.id}`}>
                {details?.assignedBy?.name}
              </a>
            }
          />
        </div>
      </div>
      <div className={styles.getfiledSpace}>
        <div className={styles.titleFiledSpace}>Task Type:</div>{" "}
        {/* Avator  */}
        <div>
          <CardHeader subheader={<div style={{fontSize:"13px", color:"#000000"}}>{details?.type}</div>} />
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default memo(AssignedContainer)
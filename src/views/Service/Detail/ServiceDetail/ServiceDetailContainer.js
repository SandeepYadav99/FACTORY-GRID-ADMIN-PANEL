import { Avatar, CardHeader } from '@material-ui/core'
import React, { memo } from 'react'
import RouteName from '../../../../routes/Route.name'
import history from '../../../../libs/history.utils'

const ServiceDetailContainer = ({details, styles, classes}) => {
 
  return (
    
    <div><div className={styles.mainFlex}>
    {/* <div className={styles.gaps} /> */}
    <div className={styles.backgroundStatus}>
     

      <div className={styles.getfiledSpace}>
        <div className={styles.titleFiledSpace}>Featured</div>{" "}
        {/* Avator  */}
        <div>
          <CardHeader subheader={<div style={{fontSize:"20px", color:"#000000"}}>{details?.is_featured?"YES":"NO"}</div>} />
        </div>
      </div>
      
      <div className={styles.getfiledSpace}>
        <div className={styles.titleFiledSpace}>Priority</div>{" "}
        {/* Avator  */}
        <div>
          <CardHeader subheader={<div style={{fontSize:"20px", color:"#000000"}}>{details?.priority}</div>} />
        </div>
      </div>


      <div className={styles.getfiledSpace}>
        <div className={styles.titleFiledSpace}>Applies To:</div>{" "}
        {/* Avator  */}
        <div>
          <CardHeader subheader={<div style={{fontSize:"20px", color:"#000000"}}>{details?.apply_to}</div>} />
        </div>
      </div>


      
      <div className={styles.getfiledSpace}>
        <div className={styles.titleFiledSpace}>Slug</div>{" "}
        {/* Avator  */}
        <div>
          <CardHeader subheader={<div style={{fontSize:"20px", color:"#000000"}}>{details?.slug}</div>} />
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default memo(ServiceDetailContainer)


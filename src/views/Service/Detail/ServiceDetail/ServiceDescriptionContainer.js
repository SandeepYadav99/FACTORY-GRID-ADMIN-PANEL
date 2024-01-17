import { CardHeader } from '@material-ui/core'
import React, { memo } from 'react'

const ServiceDescriptionContainer = ({styles, details, classes}) => {
  return (
    <div><div className={styles.mainFlex}>
    {/* <div className={styles.gaps} /> */}
    <div className={styles.backgroundStatus1}>
      <div className={styles.getfiledSpace}>
        {/* Avator  */}
        <div>
          <CardHeader
            title={
              <span className={classes.subTitle}>
               Description:
              </span>
            }
            subheader={
              <p className={classes.paragraph}>
                {" "}
                {details?.description}
              </p>
            }
          />
        </div>
      </div>
    
    </div>
   
    
  </div></div>
  )
}

export default memo(ServiceDescriptionContainer)
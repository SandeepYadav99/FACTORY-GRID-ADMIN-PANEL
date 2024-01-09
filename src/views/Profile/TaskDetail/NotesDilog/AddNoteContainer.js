import { Avatar, ButtonBase, Card, CardHeader } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { memo } from 'react'
import WaitingComponent from '../../../../components/Waiting.component'
import NotesDilog from './NotesDilog'

const AddNoteContainer = ({details, styles, classes, toggleAcceptDialog,isAcceptPopUp}) => {
  return (
    <div>   <div className={styles.plainPaper}>
    <div className={styles.newContainer}>
      <div className={styles.notesContainer}>
        <div className={styles.title}>Notes</div>
        <div>
          <ButtonBase
            className={styles.addTask}
            onClick={toggleAcceptDialog}
          >
            <div>
              <Add fontSize={"small"} />
            </div>
            <div className={styles.innerText}>Add Note</div>
          </ButtonBase>
        </div>
      </div>
      {!details?.notes.length > 0 ? (
        <div className={styles.mainFlex}>
          <div>
            <div style={{ marginLeft: "15px" }}>
              Notes entered will be displayed here. Notes entered will be
              displayed here
            </div>
            <Card>
              <CardHeader
                avatar={<Avatar>R</Avatar>}
                title={<span className={classes.boldTitle}>Pranav</span>}
                subheader="September 14, 2016"
              />
            </Card>
          </div>
          <div className={styles.gaps} />
          <div>
            <div style={{ marginLeft: "15px" }}>
              Notes entered will be displayed here. Notes entered will be
              displayed here
            </div>
            <Card>
              <CardHeader
                avatar={<Avatar>R</Avatar>}
                title={<span className={classes.boldTitle}>Pranav</span>}
                subheader="September 14, 2016"
              />
            </Card>
          </div>
          {/* Dilog Box nots */}
          <NotesDilog
            isOpen={isAcceptPopUp}
            handleToggle={toggleAcceptDialog}
          />
          {/*  empId={empId}
    suspendItem={suspendItem} */}
        </div>
      ) : (
        <WaitingComponent />
      )}
    </div>
  </div></div>
  )
}

export default memo(AddNoteContainer)
import { Avatar, ButtonBase, Card, CardHeader } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { memo} from "react";

import NotesDilog from "./NotesDilog";
import useNotesDilogHook from "./NotesDilogHook";
import NoteItem from "./NoteItems";

const AddNoteContainer = ({ details, styles, classes }) => {
  const {
    form,
    toggleAcceptDialog,
    isAcceptPopUp,
    changeTextData,
    handleSubmit,
    noteDetails,
  } = useNotesDilogHook();

  return (
    <div>
      <div className={styles.plainPaper}>
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
          {!details?.notes > 0 ? (
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
                    title={<span className={classes.boldTitle}>noteDetail</span>}
                    subheader="September 14, 2016"
                  />
                </Card>
              </div>
              <NotesDilog
                isOpen={isAcceptPopUp}
                handleToggle={toggleAcceptDialog}
                form={form}
                changeTextData={changeTextData}
                handleSubmit={handleSubmit}
              />
            </div>
            ) : (<div className={styles.notFound}>Notes not available!</div>)
            }
        </div>
      </div>
    </div>
  );
};

export default memo(AddNoteContainer);

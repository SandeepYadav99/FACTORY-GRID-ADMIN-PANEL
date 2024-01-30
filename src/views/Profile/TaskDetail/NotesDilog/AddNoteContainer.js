import {  ButtonBase} from "@material-ui/core";
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
    errorData,
   
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
          <NotesDilog
             isOpen={isAcceptPopUp}
            handleToggle={toggleAcceptDialog}
            form={form}
             changeTextData={changeTextData}
             handleSubmit={handleSubmit}
             errorData={errorData}
             onBlurHandler
           />
 
           { noteDetails?.length > 0 ? 
            noteDetails?.map((note, index) => (
              <NoteItem              
                 key={index}
                 note={note}
                 styles={styles}
                 classes={classes}
                 />
           
            )) : <div className={styles.notFound}>Notes not available!</div>
            }
        </div>
      </div>
    </div>
  );
};

export default memo(AddNoteContainer);

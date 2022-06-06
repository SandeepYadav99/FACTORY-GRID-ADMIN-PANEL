import React, {useCallback, useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import Note from "./Note.component";
import {WaitingComponent} from "../../../../components/index.component";
import {Button} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import styles from './Style.module.css';
import NoteDialog from "./NoteDialog.view";

const LeadNoteList = () => {
    const [isNote, setIsNote] = useState(false);

    const {is_quote_notes, quote_notes, quote_detail} = useSelector(state => state.quotes);

    const list = useMemo(() => {
        if (is_quote_notes || quote_notes.length === 0) {
            return null;
        }
        return quote_notes.map((val) => {
            return (<Note key={val.id} data={val}/>);
        });
    }, [quote_notes]);

    const _handleNote = useCallback(() => {
        setIsNote(e => !e);
    }, [setIsNote]);

    if (is_quote_notes) {
        return (<WaitingComponent/>);
    }

    return (
        <div className={styles.plainCont}>
            <div className={styles.actionBtn}>
                <div>Notes</div>
                <Button onClick={_handleNote} variant={'contained'} color={'primary'} className={'leadBtn'}>
                    <Add></Add> Add Note
                </Button>
            </div>
            <br/>
            {list}
            <NoteDialog quoteId={quote_detail ? quote_detail.quote_id : ''} open={isNote} handleClose={_handleNote}/>
        </div>
    )
};

export default LeadNoteList;

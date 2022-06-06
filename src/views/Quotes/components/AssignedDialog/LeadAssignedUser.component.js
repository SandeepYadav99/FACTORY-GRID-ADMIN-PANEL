import React, {useCallback, useMemo, useState} from 'react';
import styles from "../LeadDetail/Style.module.css";
import {ButtonBase} from "@material-ui/core";
import AssignedDialog from "./AssignedDialog.view";
import {useDispatch, useSelector} from "react-redux";
import handleSubmit from "redux-form/lib/handleSubmit";
import {actionAssignQuote} from "../../../../actions/Quotes.action";

const LeadAssignedUser = () => {
    const [open, setOpen] = useState(false);
    const { quote_detail: quoteDetail } = useSelector(state => state.quotes);
    const dispatch = useDispatch();
    const _handleClose = useCallback(() => {
        setOpen(e => !e);
    }, [setOpen]);

    const handleSubmit = useCallback((data) => {
        dispatch(actionAssignQuote(quoteDetail.quote_id, data.user_id));
        setOpen(false);
    }, [quoteDetail, setOpen]);

    const renderAssigned = useMemo(() => {
        if (quoteDetail.assigned_data) {
            return (
                <div className={styles.assignedTo}>
                    <img src={quoteDetail.assigned_data.image ? quoteDetail.assigned_data.image :require('../../../../assets/img/profile.png')} alt="" height={30}/>
                    <div className={styles.assignee}>
                        <div className={styles.assign}>{quoteDetail.assigned_data.name}</div>
                        <div className={styles.assignedDate}>{quoteDetail.assigned_data.assigned_date}</div>
                    </div>
                </div>
            )
        }
        return (
            <div className={styles.assignedTo}>
                N/A
            </div>
        )
    }, [quoteDetail]);

    return (
        <div>
            <div className={styles.cases}>
                <div className={styles.assign}>Assigned to</div>
                <ButtonBase className={styles.change} onClick={_handleClose}>Change</ButtonBase>
            </div>
            {renderAssigned}
            <AssignedDialog handleSubmitProps={handleSubmit} open={open} handleClose={_handleClose}/>
        </div>
    );
};

export default LeadAssignedUser;

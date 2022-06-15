import React, {useCallback, useMemo, useState} from 'react';
import styles from "../LeadDetail/Style.module.css";
import {ButtonBase} from "@material-ui/core";
import AssignedDialog from "./AssignedDialog.view";
import {useDispatch, useSelector} from "react-redux";
import handleSubmit from "redux-form/lib/handleSubmit";
import {actionAssignSupport} from "../../../../actions/Support.action";

const LeadAssignedUser = () => {
    const [open, setOpen] = useState(false);
    const { support_detail: supportDetail } = useSelector(state => state.support);
    const dispatch = useDispatch();
    const _handleClose = useCallback(() => {
        setOpen(e => !e);
    }, [setOpen]);

    const handleSubmit = useCallback((data) => {
        dispatch(actionAssignSupport(supportDetail.support_id, data.user_id));
        setOpen(false);
    }, [supportDetail, setOpen]);

    const renderAssigned = useMemo(() => {
        if (supportDetail.assigned_data.name !== null) {
            return (
                <div className={styles.assignedTo}>
                    <img src={supportDetail.assigned_data.image ? supportDetail.assigned_data.image :require('../../../../assets/img/profile.png')} alt="" height={30}/>
                    <div className={styles.assignee}>
                        <div className={styles.assign}>{supportDetail.assigned_data.name}</div>
                        <div className={styles.assignedDate}>{supportDetail.assigned_data.assigned_date}</div>
                    </div>
                </div>
            )
        }
        return (
            <div className={styles.notAssignedTo}>
                Unassigned
            </div>
        )
    }, [supportDetail]);

    return (
        <div className={styles.caseFlex}>
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

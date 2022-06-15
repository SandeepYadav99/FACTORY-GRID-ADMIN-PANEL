import React, {useCallback, useMemo, useState} from 'react';
import styles from "../LeadDetail/Style.module.css";
import {ButtonBase} from "@material-ui/core";
import ConcernDialog from './ConcernDialog.view'
import {useDispatch, useSelector} from "react-redux";
import {actionChangeSupportConcern} from "../../../../actions/Support.action";
import constants from "../../../../config/constants";

const LeadAssignedUser = () => {
    const [open, setOpen] = useState(false);
    const { support_detail: supportDetail } = useSelector(state => state.support);
    const dispatch = useDispatch();
    const _handleClose = useCallback(() => {
        setOpen(e => !e);
    }, [setOpen]);

    const handleSubmit = useCallback((data) => {
         dispatch(actionChangeSupportConcern(supportDetail.support_id,data.concern));
        setOpen(false);
    }, [supportDetail, setOpen]);

    const renderConcern = useMemo(() => {
        return (
                <div className={styles.assignedTo}>
                    <div>{constants.CONCERN_STATUS_TEXT[supportDetail.concern]}</div>
                </div>
        )
    }, [supportDetail]);

    return (
        <div className={styles.caseFlex}>
            <div className={styles.cases}>
                <div className={styles.assign}>Concern</div>
                <ButtonBase className={styles.change} onClick={_handleClose}>Change</ButtonBase>
            </div>
            {renderConcern}
            <ConcernDialog handleSubmitProps={handleSubmit} open={open} handleClose={_handleClose}/>
        </div>
    );
};

export default LeadAssignedUser;

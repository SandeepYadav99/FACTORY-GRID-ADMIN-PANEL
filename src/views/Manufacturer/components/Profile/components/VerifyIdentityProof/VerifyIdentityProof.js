import React from 'react';
import styles from "../../Style.module.css";
import ButtonBase from "@material-ui/core/ButtonBase";
import {Done, Clear} from '@material-ui/icons';
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

class VerifyIdentityProof extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    _renderButtons = () => {
        const { identityProof, status, isVerified, handleVerification } = this.props;
        if (status === 'PENDING') {
            return (
                <div className={styles.flex}>
                    <ButtonBase onClick={() => {handleVerification('ACTIVE')}}>
                        <Done />
                    </ButtonBase>
                    <ButtonBase onClick={() => {handleVerification('REJECTED')}}>
                        <Clear />
                    </ButtonBase>
                </div>
            )
        } if (isVerified) {
            return (<span><VerifiedUserIcon className={styles.verified}/></span>)
        } return null;
    }

    render() {
        const { identityProof, isVerified } = this.props;
        return (
            <div className={styles.flex}>
            <div className={styles.value}><span><a target={'_blank'} href={identityProof} className={styles.attach}>(view attachment)</a> </span></div>
                {this._renderButtons()}
            </div>
        );
    }
};

export default VerifyIdentityProof;

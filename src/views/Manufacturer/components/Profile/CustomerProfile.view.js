import React, {Component} from 'react';
import styles from './Style.module.css';
import {Button, ButtonBase, capitalize} from "@material-ui/core";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Rating from '@material-ui/lab/Rating';
import {WaitingComponent} from "../../../../components/index.component";
import VerifyIdentityProof from "./components/VerifyIdentityProof/VerifyIdentityProof";
import Timeline from "./components/Timeline/Timeline.view";


class ProfileView extends Component{
    constructor(props) {
        super(props);

        this.state = {
            bank_details: null
        };

    }

    async componentDidMount() {

    }


    render() {
        const {data, id, isFetching} = this.props;
        const {changingStatus,bank_details} = this.state;

        // if (isFetching || data == null) {
        //     return (<div>
        //         <WaitingComponent/>
        //     </div>);
        // }
        return (
            <div>
                <div className={styles.upperFlex}>
                    <div className={styles.left}>

                        <div className={styles.plain}>
                            <div className={styles.profile}>
                                <img src={require('../../../../assets/img/download.png')} className={styles.templateImg}/>
                                <div>
                                    <ButtonBase className={styles.removeBtn}> Remove x</ButtonBase>
                                </div>
                                <div className={styles.user}>Full Name</div>
                                <div className={styles.name}>Company Name</div>
                                <div className={styles.member}>Member Since: 11/02/2022</div>
                            </div>

                            <div>
                                <div className={styles.key}>Industry</div>
                                <div className={styles.value}>Pharmaceuticals</div>
                            </div>
                            <br/>

                            <div className={styles.line}>
                                <div className={styles.key}>Role</div>
                                <div className={styles.value}>Owner/Primary Contact</div>
                            </div>

                            <div className={styles.ageFlex}>
                                <div className={styles.gender}>
                                    <div className={styles.key}>Membership Type</div>
                                    <div>Free</div>
                                </div>
                                <div className={styles.gender}>
                                    <div className={styles.key}>Validity</div>
                                    <div>10/10/2022</div>
                                </div>
                            </div>

                            <div className={styles.categoryFlex}>
                                <div className={styles.category} style={{marginRight:'10px'}}>Manufacturer</div>
                                <div className={styles.category}>Customer</div>
                            </div>

                            <h4 className={styles.contactHeading}>Contact</h4>
                            <div className={styles.conContainer}>
                                <div className={styles.head}>Email <span><VerifiedUserIcon className={styles.verified}/></span></div>
                                {/*{data.is_email_verified == true ? <span><VerifiedUserIcon className={styles.verified}/></span> : ''}*/}
                                <div className={styles.val}>fabpranav@gmail.com</div>
                            </div>
                            <div className={styles.conContainer}>
                                <div className={styles.head}>Phone <span><VerifiedUserIcon className={styles.verified}/></span></div>
                                <div className={styles.value}>98989898</div>
                            </div>


                        </div>

                        <div className={styles.plain}>
                           <div className={styles.accountFlex}>
                               <div className={styles.headings}>Account Quality</div>
                               <div><ButtonBase className={styles.view}>Manage</ButtonBase></div>
                           </div>

                            <div className={styles.blockFlex}>
                                <div className={styles.bottomProfile}>
                                    <img src={require('../../../../assets/img/download.png')} className={styles.profileImg}/>
                                    <div className={styles.info}>
                                        <div className={styles.profileName}>Pranav Bhasin</div>
                                        <div className={styles.designation}>Designation</div>
                                    </div>
                                </div>
                                <div><ButtonBase className={styles.view}>View Profile</ButtonBase></div>
                            </div>
                            <br/>
                            <div>
                                <div className={styles.key}>Contact Information</div>
                                <div className={styles.val}>+91 98958494545</div>
                                <div className={styles.val}>pranav@fg.com</div>
                            </div>
                        </div>

                    </div>

                    <div className={styles.right}>
                        <div className={styles.plain}>
                            <div className={styles.headings}>Interested Industries</div>
                            <div className={styles.industries}>
                                Pharmaceuticals,Automotive, Manufacturing
                            </div>
                        </div>

                        <div className={styles.plain}>
                            <div className={styles.activityFlex}>
                                <div className={styles.headings}>Activity</div>
                                <div className={styles.latest}><strong>Latest Activity</strong> : 12/2/21    12:00:00</div>
                            </div>
                            <Timeline/>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default ProfileView

// import React, {Component} from 'react';
// import styles from './Styles.module.css';
// import {Field, reduxForm} from 'redux-form';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import Checkbox from '@material-ui/core/Checkbox';
// import EmailIcon from '@material-ui/icons/Email';
// import CallIcon from '@material-ui/icons/Call';
// import {ButtonBase} from "@material-ui/core";

// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import {Add, Assignment, CalendarToday, Description, Details, Lock} from "@material-ui/icons";
// import ResetPasswordDialog from '../ForgotPassword/ResetPassword.view'

// class Profile extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             open: false,
//         }
//         this._handleResetPassword = this._handleResetPassword.bind(this);
//         this._handleClose = this._handleClose.bind(this)
//     }

//     _handleResetPassword(){

//     }

//     _handleClose() {
//         this.setState({open: !this.state.open});
//     }

//     render() {
//         const {profile} = this.state;
//         return (
//             <div>
//                 <div className={styles.upperFlex}>
//                 <div className={styles.profileHeading}>My Profile</div>
//                     <div>
//                         <ButtonBase className={styles.resetButton} onClick={this._handleClose}>
//                             <div><Lock fontSize={'small'}/></div>
//                             <div className={styles.innerText}>Reset Password</div>
//                         </ButtonBase>

//                         <ButtonBase className={styles.addTask}>
//                             <div><Add fontSize={'small'}/></div>
//                             <div className={styles.innerText}>Add Task</div>
//                         </ButtonBase>
//                     </div>
//                 </div>

//                 <div className={styles.profileFlex}>
//                     <div className={styles.leftSection}>
//                         <div className={styles.plain}>
//                             <ButtonBase className={styles.edit}>Edit</ButtonBase>
//                             <div className={styles.profileContainer}>
//                                 <img src={require('../../assets/img/download.png')}/>{/*<div>NO PHOTO THEN SHOW INITIALS</div>*/}

//                                 <div className={styles.name}>Duran Clyton</div>
//                                 <div className={styles.position}>Emp. ID</div>

//                                 <div className={styles.designation}>Administrator</div>
//                                 <div className={styles.status}>Active</div>
//                             </div>

//                             <hr/>
//                             <h5 className={styles.heading}>Contact Info</h5>
//                             <div>
//                                 <div className={styles.contactFlex}><EmailIcon className={styles.contactIcons}/><span className={styles.email}>Clayton@example.com</span></div>
//                                 <div className={styles.contactFlex}><CallIcon className={styles.contactIcons}/> <span className={styles.email}>+132 23242 3434</span></div>
//                             </div>

//                             <h5 className={styles.heading}>Work Info</h5>
//                             <div>
//                                 <div className={styles.activityFlex}><Description className={styles.contactIcons}/><span className={styles.activity}>Department</span></div>
//                                 <div className={styles.activityFlex}><Details className={styles.contactIcons}/><span className={styles.activity}>Designation</span></div>
//                                 <div className={styles.activityFlex}><CalendarToday className={styles.contactIcons}/><span className={styles.activity}>Date Of Joining</span></div>
//                                 <div className={styles.activityFlex}><Assignment className={styles.contactIcons}/><span className={styles.activity}>Manager</span></div>
//                             </div>

//                             <h5 className={styles.heading}>Activity Info</h5>
//                             <div>
//                                 <div className={styles.activityFlex}><EmailIcon className={styles.contactIcons}/><span className={styles.activity}>12/02/2021 12:12:00</span></div>
//                                 <div className={styles.activityFlex}><CallIcon className={styles.contactIcons}/><span className={styles.activity}>172.12.12.11</span></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles.rightSection}>
//                         <div className={styles.plain}>
//                             <div className={styles.upperFlex}>
//                             <h3 className={styles.taskHeading}>Tasks Lists</h3>
//                                 <div className={'myprofile'}>
//                                     <FormControl variant={'outlined'} className={styles.selectWidth}>
//                                         <Select
//                                             disableUnderline
//                                             // value={''}
//                                             onChange={this._handleChange}
//                                             // IconComponent={ExpandMore}
//                                         >
//                                             <MenuItem value={'PENDING'}>Pending</MenuItem>
//                                             <MenuItem value={'COMPLETED'}>Completed</MenuItem>
//                                             {/*<MenuItem value={'PRICE_HIGH'}>Price (High to Low)</MenuItem>*/}
//                                             {/*<MenuItem value={'RATING'}>Rating</MenuItem>*/}
//                                         </Select>
//                                     </FormControl>
//                                 </div>
//                             </div>
//                             <div className={styles.check}>
//                                 <Checkbox color={'primary'}/>
//                                 Animation Css Practise
//                             </div>
//                             <div className={styles.dummy}>Lorem Ipsum is simply dummy text of the printing and typesetting industry text of the simply dummy</div>

//                             <div className={styles.taskFlex}>
//                                 <div className={styles.timeFlex}><EmailIcon className={styles.contactIcons}/><span className={styles.info}>20 July 2021{' '}12:00 PM</span></div>
//                                 <div className={styles.priority}>HIGH</div>
//                                 <div className={styles.section}>Finance</div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//                 <ResetPasswordDialog open={this.state.open}  handleClose={this._handleClose}/>
//             </div>
//         )
//     }
// }

// const profile = reduxForm({
//     form: 'profile',
// })(Profile);

// function mapStateToProps(state) {
//     return {

//     };
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({}, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(profile)

import React, { useState } from "react";
import styles from "./Styles.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";
import { ButtonBase, FormControl, Select, MenuItem } from "@material-ui/core";
import {
  Add,
  Assignment,
  CalendarToday,
  Description,
  Details,
  Lock,
} from "@material-ui/icons";
import ResetPasswordDialog from "../ForgotPassword/ResetPassword.view";
import useMyProfileHook from "./MyProfileHook";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { profileDetails, handleEdit } = useMyProfileHook();
  console.log(profileDetails, "Profile DETAIL")
  const handleResetPassword = () => {
    // Your logic for handling reset password
  };

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className={styles.upperFlex}>
        <div className={styles.profileHeading}>My Profile</div>
        <div>
          <ButtonBase className={styles.resetButton} onClick={handleClose}>
            <div>
              <Lock fontSize={"small"} />
            </div>
            <div className={styles.innerText}>Reset Password</div>
          </ButtonBase>

          <ButtonBase className={styles.addTask}>
            <div>
              <Add fontSize={"small"} />
            </div>
            <div className={styles.innerText}>Add Task</div>
          </ButtonBase>
        </div>
      </div>

      <div className={styles.profileFlex}>
        <div className={styles.leftSection}>
          <div className={styles.plain}>
            <ButtonBase className={styles.edit} onClick={()=>handleEdit(profileDetails)}>Edit</ButtonBase>
            <div className={styles.profileContainer}>
              <img src={profileDetails?.image} alt=""/>
              {/*<div>NO PHOTO THEN SHOW INITIALS</div>*/}

              <div className={styles.name}>{profileDetails?.name}</div>
              <div className={styles.position}>Emp. ID : {profileDetails?.employee_id}</div>

              {/* <div className={styles.designation}>Administrator</div> */}
              <div className={styles.designation}>{profileDetails?.role}</div>
              <div className={styles.status}>{profileDetails?.status}</div>
            </div>

            <hr />
            <h5 className={styles.heading}>Contact Info</h5>
            <div>
              <div className={styles.contactFlex}>
                <EmailIcon className={styles.contactIcons} />
                <span className={styles.email}> {profileDetails?.email}</span>
              </div>
              <div className={styles.contactFlex}>
                <CallIcon className={styles.contactIcons} />{" "}
                <span className={styles.email}> {profileDetails?.contact}</span>
              </div>
            </div>

            <h5 className={styles.heading}>Work Info</h5>
            <div>
              <div className={styles.activityFlex}>
                <Description className={styles.contactIcons} />
                {/* <span className={styles.activity}>Department</span> */}
                <span className={styles.activity}>{profileDetails?.department}</span>
              </div>
              <div className={styles.activityFlex}>
                <Details className={styles.contactIcons} />
                {/* <span className={styles.activity}>Designation</span> */}
                <span className={styles.activity}>{profileDetails?.designation
}</span>
              </div>
              <div className={styles.activityFlex}>
                <CalendarToday className={styles.contactIcons} />
                {/* <span className={styles.activity}>Date Of Joining</span> */}
                <span className={styles.activity}>{profileDetails?.joiningDateText || "N/A"
}</span>
              </div>
              <div className={styles.activityFlex}>
                <Assignment className={styles.contactIcons} />
                {/* <span className={styles.activity}>Manager</span> */}
                <span className={styles.activity}>Manager</span>
              </div>
            </div>

            <h5 className={styles.heading}>Activity Info</h5>
            <div>
              <div className={styles.activityFlex}>
                <EmailIcon className={styles.contactIcons} />
                {/* <span className={styles.activity}>12/02/2021 12:12:00</span> */}
                <span className={styles.activity}>{profileDetails?.lastLoginText !== "Invalid date" ? profileDetails?.lastLoginText :   "N/A"}</span>
              </div>
              <div className={styles.activityFlex}>
                <CallIcon className={styles.contactIcons} />
                <span className={styles.activity}>{profileDetails?.current_ip || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.plain}>
            <div className={styles.upperFlex}>
              <h3 className={styles.taskHeading}>Tasks Lists</h3>
              <div className={"myprofile"}>
                <FormControl
                  variant={"outlined"}
                  className={styles.selectWidth}
                >
                  <Select
                    disableUnderline
                    // value={''}
                    // onChange={_handleChange}
                    // IconComponent={ExpandMore}
                  >
                    <MenuItem value={"PENDING"}>Pending</MenuItem>
                    <MenuItem value={"COMPLETED"}>Completed</MenuItem>
                    {/*<MenuItem value={'PRICE_HIGH'}>Price (High to Low)</MenuItem>*/}
                    {/*<MenuItem value={'RATING'}>Rating</MenuItem>*/}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className={styles.check}>
              <Checkbox color={"primary"} />
              Animation Css Practise
            </div>
            <div className={styles.dummy}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry text of the simply dummy
            </div>

            <div className={styles.taskFlex}>
              <div className={styles.timeFlex}>
                <EmailIcon className={styles.contactIcons} />
                <span className={styles.info}>20 July 2021 12:00 PM</span>
              </div>
              <div className={styles.priority}>HIGH</div>
              <div className={styles.section}>Finance</div>
            </div>
          </div>
        </div>
      </div>

      <ResetPasswordDialog open={open} handleClose={handleClose} />
    </div>
  );
};

export default Profile;

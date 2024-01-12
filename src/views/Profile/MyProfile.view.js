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
import WaitingComponent from "../../components/Waiting.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import AddTaskCreate from "./Create/AddTaskCreate";
import TaskListItem from "./TaskListView";
import capitalizeFirstLetter from "../../hooks/CapsFirstLetter";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const {
    profileDetails,
    handleEdit,
    isLoading,
    isSidePanel,
    handleSideToggle,
    profileId,
    handleDetailPage,
    taskLists,
    filterValue,
    setTaskCreated,
    handleCreatedTask,
    markAsCompleted,
    completedHandler,
    filterCompltedTask,
  } = useMyProfileHook();

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      {isLoading ? (
        <WaitingComponent />
      ) : (
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

              <ButtonBase className={styles.addTask} onClick={handleSideToggle}>
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
                <ButtonBase
                  className={styles.edit}
                  onClick={() => handleEdit(profileDetails)}
                >
                  Edit
                </ButtonBase>
                <div className={styles.profileContainer}>
                  <img src={profileDetails?.image} alt="" />

                  <div className={styles.name}>
                    {capitalizeFirstLetter(profileDetails?.name)}
                  </div>
                  <div className={styles.position}>
                    Emp. ID : {profileDetails?.employee_id || "N/A"}
                  </div>

                  <div className={styles.designation}>
                    {profileDetails?.role || "N/A"}
                  </div>
                  <div className={styles.status}>
                    {profileDetails?.status || "N/A"}
                  </div>
                </div>

                <hr />
                <h5 className={styles.heading}>Contact Info</h5>
                <div>
                  <div className={styles.contactFlex}>
                    <EmailIcon className={styles.contactIcons} />
                    <span className={styles.email}>
                      {" "}
                      {profileDetails?.email || "N/A"}
                    </span>
                  </div>
                  <div className={styles.contactFlex}>
                    <CallIcon className={styles.contactIcons} />{" "}
                    <span className={styles.email}>
                      {" "}
                      {profileDetails?.contact || "N/A"}
                    </span>
                  </div>
                </div>

                <h5 className={styles.heading}>Work Info</h5>
                <div>
                  <div className={styles.activityFlex}>
                    <Description className={styles.contactIcons} />

                    <span className={styles.activity}>
                      {profileDetails?.department}
                    </span>
                  </div>
                  <div className={styles.activityFlex}>
                    <Details className={styles.contactIcons} />

                    <span className={styles.activity}>
                      {profileDetails?.designation}
                    </span>
                  </div>
                  <div className={styles.activityFlex}>
                    <CalendarToday className={styles.contactIcons} />

                    <span className={styles.activity}>
                      {profileDetails?.joiningDateText || "N/A"}
                    </span>
                  </div>
                  <div className={styles.activityFlex}>
                    <Assignment className={styles.contactIcons} />

                    <span className={styles.activity}>Manager</span>
                  </div>
                </div>

                <h5 className={styles.heading}>Activity Info</h5>
                <div>
                  <div className={styles.activityFlex}>
                    <EmailIcon className={styles.contactIcons} />

                    <span className={styles.activity}>
                      {profileDetails?.lastLoginText !== "Invalid date"
                        ? profileDetails?.lastLoginText
                        : "N/A"}
                    </span>
                  </div>
                  <div className={styles.activityFlex}>
                    <CallIcon className={styles.contactIcons} />
                    <span className={styles.activity}>
                      {profileDetails?.current_ip || "N/A"}
                    </span>
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
                        value={filterValue}
                        onChange={filterCompltedTask}
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
                {taskLists && taskLists.length > 0 ? (
                  taskLists.map((task) => (
                    <TaskListItem
                      key={task.id}
                      task={task}
                      handleDetailPage={handleDetailPage}
                      markAsCompleted={markAsCompleted}
                      completedHandler={completedHandler}
                    />
                  ))
                ) : (
                  <p className={styles.notfound}> Tasks is not available!</p>
                )}
              </div>
            </div>
          </div>

          <ResetPasswordDialog open={open} handleClose={handleClose} />
          {/* Side Pannel for Add Task management  */}
          <SidePanelComponent
            handleToggle={handleSideToggle}
            title={"Create New Task"} // profileId ? "Update Hubs" :
            open={isSidePanel}
            side={"right"}
          >
            <AddTaskCreate
              handleSideToggle={handleSideToggle}
              isSidePanel={isSidePanel}
              // empId={profileId}
              profileDetails={profileDetails}
              handleCreatedTask={handleCreatedTask}
            />
          </SidePanelComponent>
        </div>
      )}
    </div>
  );
};

export default Profile;

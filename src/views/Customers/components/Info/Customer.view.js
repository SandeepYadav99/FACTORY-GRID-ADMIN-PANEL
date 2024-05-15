import React from "react";

import styles from "./style.module.css";

import useCustomerProfileHook from "../../../../helper/CustomerProfileHook";
import { VerifiedUser } from "@material-ui/icons";

import SimplePopovers from "../../../Manufacturer/components/Profile/components/Popover/SimplePopovers";
import Queries from "../../../Manufacturer/components/Profile/components/Queries/Queries.view";
import Messages from "../../../Manufacturer/components/Profile/components/Messages/Messages.component";
import MessageFormView from "../../../Manufacturer/components/Profile/components/Messages/MessageForm.view";
import Activity from "../../../Manufacturer/components/Profile/components/Activity";
import AccountQuality from "../AcountQuality/AcountQuality";



const CustomerComponent = ({}) => {
  const { userProfile, renderInterestArea } = useCustomerProfileHook();

  return (
  
    <div>
    <div className={styles.upperFlex}>
      <div className={styles.left}>
        <div className={styles.plain}>
          <div className={styles.profile}>
            <img
              src={userProfile.image}
              className={styles.templateImg}
              alt=""
            />
            <div>
              {/* <ButtonBase className={styles.removeBtn}>Remove x</ButtonBase> */}
            </div>
            <div className={styles.user}>
              {" "}
              {`${userProfile?.first_name || " "} ${
                userProfile?.last_name || " "
              }`}
            </div>
            <div className={styles.name}>
              {" "}
              {userProfile?.business?.company_name}
            </div>
            <div className={styles.member}>
              Member Since: {userProfile?.membershipStartText || "N/A"}
            </div>
          </div>

          <div>
            <div className={styles.key}>Industry </div>
            <div className={styles.value}>{userProfile?.industry?.name}</div>
          </div>
          <br />

          <div className={styles.line}>
            <div className={styles.key}>Role</div>
            <div className={styles.value}>{userProfile?.role || "N/A"}</div>
            {/* Owner/Primary Contact  */}
          </div>

          <div className={styles.ageFlex}>
            <div className={styles.gender}>
              <div className={styles.key}>Membership Type</div>
              <div>{userProfile?.membership_type || "N/A"}</div>
            </div>
            <div className={styles.gender}>
              <div className={styles.key}>Validity</div>
              <div> {userProfile?.membershipEndText || "N/A"}</div>
            </div>
          </div>

          <div className={styles.categoryFlex}>
            {userProfile?.user_type === "MANUFACTURE" ? (
              <div
                className={styles.category}
                style={{ marginRight: "10px" }}
              >
                Manufacturer
              </div>
            ) : (
              <div className={styles.category}>Customer</div>
            )}
          </div>

          <h4 className={styles.contactHeading}>Contact</h4>
          <div className={styles.conContainer}>
            <div className={styles.head}>
              <div className={styles.subhead}>Email </div>

              <div className={styles.val}>
                { userProfile?.email}
              </div>
            </div>
            <div>
               {userProfile.is_email_verified ? (
                <VerifiedUser className={styles.verified} />
              ) : (
                
                 <SimplePopovers userProfile={userProfile} title={"Email"} />
              )} 
            </div>
            {/*{data.is_email_verified == true ? <span><VerifiedUserIcon className={styles.verified}/></span> : ''}*/}
          </div>
          <div className={styles.conContainer}>
            <div className={styles.head}>
              <div className={styles.subhead}>Phone</div>

              <div className={styles.value}>
                {userProfile?.contact_string}
              </div>
            </div>
          <div>
             {userProfile?.is_contact_verified ? (
              <VerifiedUser className={styles.verified} />
            ) : (
              <SimplePopovers />
            )} 
          </div>
          </div>
        </div>
      
        <AccountQuality
          userProfileAccountQuality={userProfile?.accountQualityManager}
        /> 
      </div>

      <div className={styles.right}>
        <div className={styles.plain}>
          <div className={styles.headings}>Interested Industries</div>
          <div className={styles.industries}>
             {renderInterestArea(userProfile.interest_area)} 
            {/* {userProfile && userProfile.interest_area} */}
            {/* Pharmaceuticals,Automotive, Manufacturing */}
          </div>
        </div>

        <Activity /> 

        <div className={styles.plain}>
          <div className={styles.headings}>Support Queries</div>
           <div>
            <Queries queryLists={userProfile?.supportBYEmail} supportQueryCount={userProfile?.supportQueryCount}/>
          </div> 
        </div>

        <div className={styles.plain}>
          <div className={styles.activityFlex}>
            <div className={styles.headings}>Messages</div>
            <div className={styles.latest}>
              <div>Last Message</div>{" "}
              <div className={styles.msgDate}>
                {userProfile?.last_active_at}
              </div>
              {/* 12/12/2021 | 1:00 PM */}
            </div>
          </div>
          <div>
            <Messages />
            <MessageFormView /> 
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CustomerComponent;

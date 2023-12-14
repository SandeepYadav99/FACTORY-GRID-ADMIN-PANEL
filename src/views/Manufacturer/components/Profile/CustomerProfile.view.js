import React, { useEffect, useState } from "react";
import { ButtonBase } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Timeline from "./components/Timeline/Timeline.view";
import Queries from "./components/Queries/Queries.view";
import Messages from "./components/Messages/Messages.component";
import MessageForm from "./components/Messages/MessageForm.view";
import styles from "./Style.module.css";
import AccountQuality from "./components/AccountQuality";
import Activity from "./components/Activity";
import { useParams } from "react-router-dom";
import { serviceGetCustomersProfile } from "../../../../services/CustomersRequest.service";
const ProfileView = ({ data,  isFetching }) => {
  const [changingStatus, setChangingStatus] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);

  // if (isFetching || data == null) {
  //     return (<div>
  //         <WaitingComponent/>
  //     </div>);
  // }

  const [userProfile, setUserProfile] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    serviceGetCustomersProfile({ id: id }).then((res) => {
     
      if (!res || !res.error) {
        setUserProfile(res && res.data);
      }
      
    });
  }, [id]);
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
                <ButtonBase className={styles.removeBtn}>Remove x</ButtonBase>
              </div>
              <div className={styles.user}> {`${userProfile.first_name || " "} ${userProfile.last_name || " "}`}</div>
              <div className={styles.name}> {userProfile && userProfile.business && userProfile.business.company_name}</div>
              <div className={styles.member}>Member Since: 11/02/2022</div>
            </div>

            <div>
              <div className={styles.key}>Industry </div>
              <div className={styles.value}>{userProfile.industry && userProfile.industry.name}</div>
            </div>
            <br />

            <div className={styles.line}>
              <div className={styles.key}>Role</div>
              <div className={styles.value}>{userProfile && userProfile.role}</div> 
               {/* Owner/Primary Contact  */}
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
              <div className={styles.category} style={{ marginRight: "10px" }}>
                Manufacturer
              </div>
              <div className={styles.category}>Customer</div>
            </div>

            <h4 className={styles.contactHeading}>Contact</h4>
            <div className={styles.conContainer}>
              <div className={styles.head}>
                Email{" "}
                <span>
                  {userProfile.is_email_verified === true ?   <VerifiedUserIcon className={styles.verified} /> :   <div className={styles.notverified}> NOT VERIFIED </div> }
                
                </span>
              </div>
              {/*{data.is_email_verified == true ? <span><VerifiedUserIcon className={styles.verified}/></span> : ''}*/}
              <div className={styles.val}>{ userProfile &&  userProfile.email}</div>
            </div>
            <div className={styles.conContainer}>
              <div className={styles.head}>
                Phone{" "}
                <span>
                  {userProfile.is_contact_verified === true ?   <VerifiedUserIcon className={styles.verified} /> : <div className={styles.notverified}> NOT VERIFIED </div> }
                 
                </span>
              </div>
              <div className={styles.value}>{userProfile && userProfile.contact_string}</div>
            </div>
          </div>
          <AccountQuality />
        </div>

        <div className={styles.right}>
          <div className={styles.plain}>
            <div className={styles.headings}>Interested Industries</div>
            <div className={styles.industries}>
              Pharmaceuticals,Automotive, Manufacturing
            </div>
          </div>

         <Activity/>

          <div className={styles.plain}>
            <div className={styles.headings}>Support Queries</div>
            <div>
              <Queries />
            </div>
          </div>

          <div className={styles.plain}>
            <div className={styles.activityFlex}>
              <div className={styles.headings}>Messages</div>
              <div className={styles.latest}>
                <div>Last Message</div>{" "}
                <div className={styles.msgDate}>12/12/2021 | 1:00 PM</div>
              </div>
            </div>
            <div>
              <Messages />
              <MessageForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

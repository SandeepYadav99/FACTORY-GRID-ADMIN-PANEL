import React, { useCallback} from "react";
import styles from "./Style.module.css";
import { Button, ButtonBase, capitalize } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Rating from "@material-ui/lab/Rating";
import { WaitingComponent } from "../../../../components/index.component";
import ImageGalleryComponent from "./components/ImageGallery/ImageGallery.component";
import useCustomerProfileHook from "../Profile/CustomerProfileHook";
import CompanyProfile from "./components/CompanyProfile/CompanyProfile";

const dummy = [
  require("../../../../assets/img/cover.jpeg"),
  require("../../../../assets/img/cover.jpeg"),
];

const BusinessDetails = ({  id }) => {
  const { userProfile, renderInterestArea } = useCustomerProfileHook();

  const galleryImage = useCallback((images) => {
    console.log(images);
    if (images && Array.isArray(images)) {
      const imagesList = images.map(element => element.gallery_image);
  
      return imagesList;
    } else {

      return [];
    }

  },[])

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
                <ButtonBase className={styles.removeBtn}> Remove x</ButtonBase>
              </div>
              <div className={styles.user}>Company Name</div>
              <a className={styles.coord} href={"/"}>
                {userProfile &&
                  userProfile.business &&
                  userProfile.business.company_name}
                {/* FG Coordinates */}
              </a>
              <div className={styles.member}>
                <Rating
                  name="read-only"
                  value={4}
                  readOnly
                  className={styles.rating}
                />
                <span className={styles.reviews}>(10 Reviews)</span>
              </div>
            </div>

            <div>
              <div className={styles.key}>Address</div>
              <div className={styles.value}>
                {userProfile &&
                  userProfile.business &&
                  userProfile.business.company_address}
                {/* Address Line 1 & 2<br />
                Pincode<br />
                City,State */}
              </div>
            </div>
            <br />

            <div className={styles.line}>
              <div className={styles.key}>Manufacture Hub</div>
              <div className={styles.value}>
                {" "}
                <a className={styles.coord} href={"/"}>
                  Baddi Nalagarh
                </a>
              </div>
            </div>

            <div className={styles.ageFlex}>
              <div className={styles.gender}>
                <div className={styles.key}>Company Type</div>
                <div>Private Limited</div>
              </div>
              <div className={styles.gender}>
                <div className={styles.key}>Incorporation Date</div>
                <div>10/10/2022</div>
              </div>
            </div>

            <div className={styles.line}>
              <div className={styles.key}>No. Of Employees</div>
              <div className={styles.value}>
                {userProfile &&
                  userProfile.business &&
                  userProfile.business.number_of_employee}
              </div>
            </div>

            <h4 className={styles.contactHeading}>Contact</h4>
            <div className={styles.conContainer}>
              <div className={styles.head}>Website</div>
              {/*{data.is_email_verified == true ? <span><VerifiedUserIcon className={styles.verified}/></span> : ''}*/}
              {/* <div className={styles.website}>www.morepen.com</div> */}
              <div className={styles.website}>
                {userProfile &&
                  userProfile.business &&
                  userProfile.business.company_website}
              </div>
            </div>
          </div>

          <div className={styles.plain}>
            <div className={styles.accountFlex}>
              <div className={styles.headings}>Company Representative</div>
            </div>

            <div className={styles.blockFlex}>
              <div className={styles.bottomProfile}>
                <img
                  src={require("../../../../assets/img/download.png")}
                  className={styles.profileImg}
                />
                <div className={styles.info}>
                  <div className={styles.profileName}>Pranav Bhasin</div>
                  <div className={styles.designation}>Designation</div>
                </div>
              </div>
              <div>
                <div className={styles.kyc}>
                  <span>
                    <VerifiedUserIcon className={styles.verified} />
                  </span>{" "}
                  KYC Verified
                </div>
              </div>
            </div>
            <br />
            <div>
              <div className={styles.key}>Contact Information</div>
              <div className={styles.val}>+91 98958494545</div>
              <div className={styles.val}>pranav@fg.com</div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <CompanyProfile userProfile={userProfile && userProfile.business} />

          <div className={styles.plain}>
            <div className={styles.headings}>Image Gallery</div>
            <ImageGalleryComponent
              title={"GALLERY"}
              image_type={"GALLERY"}
              images={galleryImage(userProfile &&  userProfile.galleries)}
              thumbnail={0}
              userId={id}
            />
          </div>

          <div className={styles.plain}>
            <div className={styles.headings}>Certificates</div>
            <ImageGalleryComponent
              title={"GALLERY"}
              image_type={"CERTIFICATES"}
              images={dummy}
              thumbnail={0}
              userId={id}
            />
          </div>

          <div className={styles.plain}>
            <div className={styles.accountFlex}>
              <div className={styles.headings}>Banking Details</div>
              <div>
                <span className={styles.brochure}>Cancelled Cheque</span>
                <ButtonBase className={styles.view}>(View File)</ButtonBase>
              </div>
            </div>
            <div className={styles.key}>Account Holder Name</div>
            <div className={styles.val}>Electrovese Solutions</div>
            <br />
            <div className={styles.bankingFlex}>
              <div className={styles.accountInfo}>
                <div className={styles.key}>Account No.</div>
                <div className={styles.val}>324324234</div>
              </div>

              <div className={styles.accountInfo}>
                <div className={styles.key}>IFSC Code</div>
                <div className={styles.val}>as342423</div>
              </div>
            </div>
            <br />
            <div className={styles.key}>Bank Name & Branch</div>
            <div className={styles.val}>Bank Name & Branch</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;

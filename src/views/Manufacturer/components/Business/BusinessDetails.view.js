import React, { useCallback } from "react";
import styles from "./Style.module.css";
import {  ButtonBase } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Rating from "@material-ui/lab/Rating";

import ImageGalleryComponent from "./components/ImageGallery/ImageGallery.component";

import CompanyProfile from "./components/CompanyProfile/CompanyProfile";
import useCustomerProfileHook from "../../../../helper/CustomerProfileHook";
import BankDetail from "./components/BankDetail/BankDetail";

const dummy = [
  require("../../../../assets/img/cover.jpeg"),
  require("../../../../assets/img/cover.jpeg"),
];
console.log(dummy, "D")
const BusinessDetails = ({ id }) => {
  const { userProfile, renderInterestArea } = useCustomerProfileHook();

  const galleryImage = useCallback((images) => {
    console.log(images);
    if (images && Array.isArray(images)) {
      const imagesList = images.map((element) => element.gallery_image);

      return imagesList;
    } else {
      return [];
    }
  }, []);
  const CERTIFICATES = userProfile.certificate || [];
  const certificateImages = CERTIFICATES.map((certificate) => certificate.certificate_file);
 

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
                  src={userProfile?.representatives?.profile_image}
                  className={styles.profileImg}
                  alt=""
                />
                <div className={styles.info}>
                  <div className={styles.profileName}>
                    {
                      userProfile?.representatives?.first_name}{" "}
                    {
                      userProfile?.representatives?.last_name}
                  </div>
                  <div className={styles.designation}>{userProfile?.representatives?.designation}</div>
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
              <div className={styles.val}>{ userProfile?.representatives?.contact}</div>
              <div className={styles.val}>{ userProfile?.representatives?.email}</div>
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
              images={
                (userProfile &&
                  userProfile.galleries &&
                  userProfile.galleries.map(
                    (element) => element.gallery_image
                  )) ||
                []
              }
              thumbnail={0}
              userId={id}
              imageList={userProfile?.galleries}
            />
          </div>

          <div className={styles.plain}>
            <div className={styles.headings}>Certificates</div>
            
            <ImageGalleryComponent
              title={"CERTIFICATES"}
              image_type={"CERTIFICATES"}
              images={certificateImages || []}
              thumbnail={0}
              userId={id}
              imageList={userProfile.certificate}
            />
          </div>

         <BankDetail bankdetail={userProfile && userProfile.bankdetail}/>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;

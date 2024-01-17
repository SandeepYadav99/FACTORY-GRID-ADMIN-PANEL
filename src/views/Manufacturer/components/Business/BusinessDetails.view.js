import React, { useCallback } from "react";
import styles from "./Style.module.css";
import { ButtonBase, Tooltip, withStyles } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Rating from "@material-ui/lab/Rating";

import ImageGalleryComponent from "./components/ImageGallery/ImageGallery.component";

import CompanyProfile from "./components/CompanyProfile/CompanyProfile";
import useCustomerProfileHook from "../../../../helper/CustomerProfileHook";
import BankDetail from "./components/BankDetail/BankDetail";
import CompanyRepresentative from "./components/CompanyRepresentative/CompanyRepresentative";
import bankImage from "../../../../assets/img/sent_blue.svg";
const dummy = [
  require("../../../../assets/img/cover.jpeg"),
  require("../../../../assets/img/cover.jpeg"),
];

const BusinessDetails = ({ id, userProfile }) => {
  // const { userProfile, renderInterestArea } = useCustomerProfileHook();

  const galleryImage = useCallback((images) => {
   
    if (images && Array.isArray(images)) {
      const imagesList = images.map((element) => element.gallery_image);

      return imagesList;
    } else {
      return [];
    }
  }, []);

 

  const CERTIFICATES = userProfile.certificate || [];
  const certificateImages = CERTIFICATES.map(
    (certificate) => certificate.certificate_file
  );

  const openGoogleMaps = useCallback((company) => {
    const url = `https://www.google.com/maps/place?q=${company?.company_lat},${company?.company_long}`;

    window.open(url, "_blank");
  }, []);

  const CustomTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#e3f2fd", 
      color: "black", 
      fontSize: theme.typography.fontSize,
    },
  }))(Tooltip);
  return (
    <div>
      <div className={styles.upperFlex}>
        <div className={styles.left}>
          <div className={styles.plain}>
            <div className={styles.profile}>
              <img
                src={userProfile?.business?.company_logo}
                className={styles.templateImg}
                alt=""
              />
              {/* <div>
                <ButtonBase className={styles.removeBtn}> Remove it</ButtonBase>
              </div> */}
              <div className={styles.user}>
               
              <a className={styles.coord} href={"#"}  onClick={()=>openGoogleMaps(userProfile?.business)}>
             {userProfile?.business?.company_name || "N/A"} 
                {/* FG Coordinates */}
              </a>
              </div>
              <div className={styles.member}>
                {/* <Rating
                  name="read-only"
                  value={1}
                  readOnly
                  className={styles.rating}
                /> */}
                <span className={styles.rating}>&#9733;</span>
                <span className={styles.rating1}>
                  {userProfile?.business?.rating || "0.0"}
                </span>

                <span className={styles.reviews}>(0 Reviews)</span>
              </div>
            </div>

            <div>
              <div className={styles.key}>Address</div>
              <div className={styles.value}>
                {userProfile?.business?.company_address || "N/A"} <br />
                Pincode: {userProfile?.business?.company_pincode || "N/A"}
                <br />
                {userProfile?.business?.company_city},{" "}
                {userProfile?.business?.company_state}
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
            {userProfile?.representatives ? (
              <CompanyRepresentative userProfile={userProfile} />
            ) : (
              <div className={styles.notfound}>Not Avalilable </div>
            )}
          </div>
        </div>

        <div className={styles.right}>
          <CompanyProfile userProfile={userProfile && userProfile.business} />

          <div className={styles.plain}>
            <div className={styles.headings}>Image Gallery</div>
            <ImageGalleryComponent
              title={"GALLERY"}
              image_type={"GALLERY"}
              // images={
              //   (
              //     userProfile?.galleries.map(
              //       (element) => element.gallery_image
              //     )) ||
              //   []
              // }
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
              // images={certificateImages || []}
              thumbnail={0}
              userId={id}
              imageList={userProfile?.certificate}
            />
          </div>
          
          <div className={styles.plain}>
            <div className={styles.accountFlex}>
              <div className={styles.headings}>Banking Details</div>

              <a href="#" className={styles.coord}>Edit</a>
            </div>
            { userProfile.bankdetail.benificiery_name ? (
              <BankDetail bankdetail={userProfile?.bankdetail} />
            ) : (
              <div style={{textAlign:"center"}}>Not Available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;

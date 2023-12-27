import File from "../../../../../../components/FileComponent/FileComponent.component";
import React, { useState, useEffect } from "react";
import styles from "./Style.module.css";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from "@material-ui/core";
import {
  Add as AddIcon,
  CloudUpload as UploadIcon,
  DeleteOutline as DeleteIcon,
  Videocam,
} from "@material-ui/icons";
import { WaitingComponent } from "../../../../../../components/index.component";
import {
  serviceDeleteCertificates,
  serviceDeleteGallery,
} from "../../../../../../services/Badge.service";
import SnackbarUtils from "../../../../../../libs/SnackbarUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageContainer = ({
  isLocal,
  type,
  handleThumbNail,
  handleDelete,
  url,
  isSelected,
  index,
  localIndex,
  image_type,
  imageList,
}) => {
  console.log(imageList, image_type);
  return (
    <div className={styles.imgContainer}>
      <div className={styles.imgBtn}>
        <ButtonBase
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDelete(type, index, localIndex);
          }}
        >
          <DeleteIcon />
        </ButtonBase>
      </div>
      <a href={url} target={"_blank"} className={styles.bottomInfo}>
        <div className={styles.imgCard}>
          <div
            className={styles.img}
            style={{
              backgroundImage: "url(" + url + ")",
              backgroundSize: "cover",
            }}
            alt=""
          />
          {url.mime_type == "VIDEO" ? (
            <div className={styles.video}>
              <Videocam className={styles.icn} />
            </div>
          ) : (
            ""
          )}
        </div>

        {image_type === "GALLERY" ? (
          <div className={styles.imgInfo}>
            <div className={styles.updated}>Image Title / Image Label</div>
            <div className={styles.updated}>Updated On 22/10/2022 11:00 PM</div>
          </div>
        ) : (
          <div className={styles.imgInfo}>
            <div className={styles.updated}>Certificate Name</div>
            <div className={styles.updated}>Issued By:</div>
            <div className={styles.updated}>Validity:</div>
            <div className={styles.updated}>Updated On 22/10/2022 11:00 PM</div>
          </div>
        )}
      </a>
    </div>
  );
};

const ImageGalleryComponent = ({
  images,
  thumbnail,
  type,
  title,
  data,
  userId,
  form_values,
  image_type,
  imageList,
}) => {
  const [localImages, setLocalImages] = useState([]);
  const [remoteImages, setRemoteImages] = useState(images);
  const [thumbnailIndex, setThumbnailIndex] = useState(thumbnail);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleteCalling, setIsDeleteCalling] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [confirmData, setConfirmData] = useState({
    index: null,
    imageIdToDelete: null,
  });
  useEffect(() => {
    console.log("Images:", images);
    console.log("Thumbnail Index:", thumbnailIndex);
  }, [images, thumbnailIndex]);

  useEffect(() => {
    setRemoteImages(images);
    setThumbnailIndex(thumbnail);
  }, [images, thumbnail]);

  const suspendItem = () => {
    const updatedRemoteImages = [...remoteImages];
    updatedRemoteImages.splice(thumbnailIndex, 1);
    setRemoteImages(updatedRemoteImages);
    setIsDeleteCalling(false);
    setShowConfirm(false);

    const imageIdToDelete = confirmData.imageIdToDelete;
    if (image_type === "GALLERY") {
      serviceDeleteGallery({ id: imageIdToDelete }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Succesfull delete ");
        }
      });
    } else {
      serviceDeleteCertificates({ id: imageIdToDelete }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Succesfull delete ");
        }
      });
    }
  };

  const handleDialogClose = () => {
    setShowConfirm(false);
  };

  const handleThumbnail = (type, index) => {
    setThumbnailIndex(index);
  };

  const handleDeleteImage = (type, index, uniIndex) => {
    setShowConfirm(true);
    setThumbnailIndex(index);

    const imageIdToDelete = imageList[uniIndex].id;
    setConfirmData({ index, imageIdToDelete });
  };

  const handleImageChange = (data) => {
    setLocalImages(data);
  };

  const handleUpload = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isUploading) {
      const fd = new FormData();
      localImages.forEach((val) => {
        fd.append("images", val);
      });
      fd.append("type", type);
      setIsUploading(true);
      // Perform the upload logic here
    }
  };

  const renderDialog = () => {
    if (showConfirm) {
      return (
        <Dialog
          keepMounted
          TransitionComponent={Transition}
          open={showConfirm}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete the item?
              <br />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Disagree
            </Button>
            <Button onClick={suspendItem} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    return null;
  };

  const renderImages = () => {
    const imagesArr = [];
    let tempIndex = 0;

    remoteImages.forEach((val, index) => {
      imagesArr.push(
        <ImageContainer
          url={val}
          handleDelete={handleDeleteImage}
          handleThumbNail={handleThumbnail}
          isSelected={thumbnailIndex === tempIndex}
          type={"REMOTE"}
          image_type={image_type}
          index={index}
          localIndex={tempIndex}
          isLocal={false}
          imageList={imageList}
        />
      );
      tempIndex++;
    });

    localImages.forEach((val, index) => {
      imagesArr.push(
        <ImageContainer
          isLocal
          url={URL.createObjectURL(val)}
          handleDelete={handleDeleteImage}
          handleThumbNail={handleThumbnail}
          isSelected={thumbnailIndex === tempIndex}
          type={"LOCAL"}
          index={index}
          localIndex={tempIndex}
        />
      );
      tempIndex++;
    });

    if (imagesArr.length > 0) {
      return (
        <div>
          <div className={styles.flexWrap}>{imagesArr}</div>
          <br />
        </div>
      );
    } else {
      return <div className={styles.noImg}>No Images Added</div>;
    }
  };

  const renderAddButton = () => {
    return (
      <div>
        <div className={styles.addButton}>
          <AddIcon fontSize={"small"} /> Add
        </div>
      </div>
    );
  };

  const renderSaveButton = () => {
    if (isUploading) {
      return (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <WaitingComponent />
        </div>
      );
    }
    return (
      <div>
        <div onClick={handleUpload} className={styles.addButton}>
          <UploadIcon fontSize={"small"} />
          <span style={{ marginLeft: "3px" }}>Save</span>
        </div>
      </div>
    );
  };

  const renderImageComponent = () => {
    if (remoteImages.length < 10) {
      return (
        <File
          multiple={true}
          onChange={handleImageChange}
          max_size={1024 * 1024 * 5}
          name={type}
          value={[]}
          selection_label={"ds"}
          error_text={"Maximum size 5MB & jpg, png, jpeg, files are allowed"}
          type={["jpg", "png", "jpeg"]}
          placeholder={"Images"}
          max_count={
            10 - remoteImages.length <= 0 ? -1 : 10 - remoteImages.length
          }
          component={
            localImages.length > 0 ? renderSaveButton() : renderAddButton()
          }
        />
      );
    }
    return null;
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            cursor: "pointer",
          }}
        >
          {renderImageComponent()}
        </div>
      </div>
      <div className={styles.imageCont}>{renderImages()}</div>
      {renderDialog()}
    </div>
  );
};

export default ImageGalleryComponent;

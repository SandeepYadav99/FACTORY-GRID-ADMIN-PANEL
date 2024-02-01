import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";

import { ButtonBase } from "@material-ui/core";

import {

  serviceResetUserStatusUpdate,
} from "../../../services/CustomersRequest.service";
import renderImagebyType from "../../../libs/Helper";
import { useParams } from "react-router-dom";
import SnackbarUtils from "../../../libs/SnackbarUtils";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    fontSize: "0.7rem",
  },
  notverified: {
    color: "yellow",
    fontSize: "1.2rem",
    marginBottom: "1px",
  },
  email: {
    color: "grey",
    fontSize: "0.7rem !important",
  },
  verify: {
    color: "#2196F3",
    fontSize: "0.7rem !important",
    marginLeft: "10px !important",
    textDecoration: "underline",
  },
  unVerify: {
    // color: "#2196F3",
    fontSize: "0.7rem !important",
    marginLeft: "10px !important",
    textDecoration: "underline",
  },
  errorVerify: {
    // color: "#2196F3",
    fontSize: "0.7rem !important",
    marginLeft: "10px !important",
    textDecoration: "underline",
  },
  bankDetail: {
    display: "flex",
    justifyContent: "spaceBetween",
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover({
  type,
  title,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { id } = useParams();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    // setTimeout(() => {
    setAnchorEl(null);
  // }, 1000);
  };
  // useEffect(() => {
  //   if (isClose) {
  //     setAnchorEl(null);
  //   }
  // }, [isClose]);

  const open = Boolean(anchorEl);
  const ids = open ? "simple-popover" : undefined;

  // const handleResend = () => {
  //   serviceResetUserEmail({
  //     user_id: userProfile?._id,
  //     email: userProfile?.email,
  //   }).then((res) => {
  //     if (!res.error) {
  //       SnackbarUtils.success("Resend Successfully");
  //     }
  //   });
  // };

  const handleVerify = () => {
    serviceResetUserStatusUpdate({
      user_id: id,
      [type]:"VERIFIED",
    }).then((res) => {
      if (!res.error) {
        SnackbarUtils.success("Verified Succesfully");
        window.location.reload()
      }
    });
  };

  const handleUnVerify = () => {
    serviceResetUserStatusUpdate({
      user_id: id,
      [type]:"ALERT",
    }).then((res) => {
      if (!res.error) {
        SnackbarUtils.success("Verified Succesfully");
        window.location.reload()
      }
    });
  };
  
  const handleErrorVerify = () => {
    serviceResetUserStatusUpdate({
      user_id: id,
      [type]:"ERROR",
    }).then((res) => {
      if (!res.error) {
        SnackbarUtils.success("Verified Succesfully");
        window.location.reload()
      }
    });
  };
  let closeTimer;
  const handleMouseLeave = () => {
    // Add a delay before closing the Popover

    handleClose();
  };

  const isVerifiedTitle = title && title.includes("VERIFIED");
  console.log(title, "Title ");
  return (
    <div onMouseLeave={handleMouseLeave}>
      <ButtonBase
        aria-describedby={ids}
        onClickCapture={handleMouseLeave}
        onMouseEnter={handleClick}
        
      >
        {renderImagebyType(title)}
      </ButtonBase>

      <Popover
        id={ids}
        sx={{
          pointerEvents: "none",
        }}
        open={open && !isVerifiedTitle}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        disableRestoreFocus
      >
        <div className={classes.bankDetail}>
        <ButtonBase onClick={handleErrorVerify} style={{marginLeft:"5px"}} className={classes.errorVerify}>Error</ButtonBase>
          <ButtonBase onClick={handleUnVerify} style={{marginLeft:"5px"}} className={classes.unVerify}>Cancel</ButtonBase>
          <ButtonBase className={classes.verify} onClick={handleVerify}>
            Verify
          </ButtonBase>
        </div>
      </Popover>
    </div>
  );
}

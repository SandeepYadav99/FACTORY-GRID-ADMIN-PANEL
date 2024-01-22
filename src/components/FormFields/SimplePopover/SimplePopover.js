import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { ButtonBase } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import {
  serviceResetUserEmail,
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
  bankDetail: {
    display: "flex",
    justifyContent: "spaceBetween",
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover({
  val,

  isClose,
  userProfile,
  type,
  title,
  bankDetailId,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { id } = useParams();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (isClose) {
      setAnchorEl(null);
    }
  }, [isClose]);

  const open = Boolean(anchorEl);
  const ids = open ? "simple-popover" : undefined;

  const handleResend = () => {
    serviceResetUserEmail({user_id:userProfile?._id, email:userProfile?.email}).then((res)=>{
      if(!res.error){
       SnackbarUtils.success("Resend Successfully")
      }
    })
  };
  console.log(type);
  const handleVerify = () => {
    serviceResetUserStatusUpdate({
      user_id: id,
      [type]: "VERIFIED",
    }).then((res) => {
      if (!res.error) {
        SnackbarUtils.success("Verified Succesfully");
      }
    });
  };

  const isVerifiedTitle = title && title.includes("VERIFIED");

  return (
    <div onMouseLeave={handleClose}>
      <ButtonBase
        aria-describedby={ids}
        onClick={handleClick}
        onMouseEnter={handleClick}
      >
        {renderImagebyType(title)}
      </ButtonBase>

      <Popover
        ids={ids}
        open={open && !isVerifiedTitle}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "right",
          horizontal: "top",
        }}
        transformOrigin={{
          vertical: "right",
          horizontal: "top",
        }}
      >
      
        {type ? (
          <div className={classes.bankDetail}>
            <ButtonBase>Cancel</ButtonBase>
            <ButtonBase className={classes.verify} onClick={handleVerify}>
              Verify
            </ButtonBase>
          </div>
        ) : (
          <>
            <Typography className={classes.typography}>
              <div className={classes.mainText}>
                Your email is currently not verified ?
              </div>
              <div>
                <ButtonBase className={classes.email}>Change Email</ButtonBase>
                <ButtonBase className={classes.verify} onClick={handleResend}>
                  Verify Now
                </ButtonBase>
              </div>
            </Typography>
          </>
        )}
      </Popover>
    </div>
  );
}

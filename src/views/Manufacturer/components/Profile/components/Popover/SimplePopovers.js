import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { ButtonBase } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";

import renderImagebyType from "../../../../../../libs/Helper";
import { useParams } from "react-router-dom";
import SnackbarUtils from "../../../../../../libs/SnackbarUtils";
import { serviceResetUserEmail } from "../../../../../../services/CustomersRequest.service";
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

export default function SimplePopovers({
 
  userProfile,
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
    setAnchorEl(null);
  };
  // useEffect(() => {
  //   if (isClose) {
  //     setAnchorEl(null);
  //   }
  // }, [isClose]);

  const open = Boolean(anchorEl);
  const ids = open ? "simple-popover" : undefined;

  const handleResend = () => {
    serviceResetUserEmail({
      user_id: userProfile?._id,
      email: userProfile?.email,
    }).then((res) => {
      if (!res.error) {
        setAnchorEl(null);
        SnackbarUtils.success("Resend Successfully");
      }
    });
  };
  console.log(type);

  let closeTimer;


 
  const isVerifiedTitle = title && title.includes("VERIFIED");

  return (
    <div onMouseLeave={handleClose}>
      <ButtonBase
        aria-describedby={ids}
        //  onMouseLeave={handleClose}
         onMouseOver={handleClick}
      >
        {renderImagebyType(title)}
      </ButtonBase>

      <Popover
        id={ids}
        sx={{
          pointerEvents: "none",
        }}
        open={open }
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
      </Popover>
    </div>
  );
}

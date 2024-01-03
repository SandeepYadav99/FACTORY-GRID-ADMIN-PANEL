import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { ButtonBase } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import { serviceResetUserEmail } from "../../../services/CustomersRequest.service";
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
}));

export default function SimplePopover({
  val,
 
  isClose,
  userProfile,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  console.log(userProfile, "Profile");
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
  const id = open ? "simple-popover" : undefined;

  const handleResend =()=>{
    serviceResetUserEmail({user_id:userProfile._id, email:userProfile.email}).then((res)=>{
      if(!res.error){
       SnackbarUtils.success("Resend Successfully")
      }
    })
  }

  return (
    <div onMouseLeave={handleClose}>
      <ButtonBase
        aria-describedby={id}
        onClick={handleClick}
        onMouseEnter={handleClick}
      >
        <ReportProblem className={classes.notverified} />
      </ButtonBase>

      <Popover
        id={id}
        open={open}
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

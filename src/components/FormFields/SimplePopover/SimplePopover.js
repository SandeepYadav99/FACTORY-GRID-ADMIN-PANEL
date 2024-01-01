import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ButtonBase } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import bankImage from "../../../assets/img/sent_blue.svg";

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
  bank: {
    color: "blue",
    fontSize: "15px",
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
  handleResend,
  isClose,
  type,
  statusType,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);



  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (isClose) {
      setAnchorEl(null);
    }
  }, [isClose, statusType, anchorEl]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div onMouseLeave={handleMouseLeave}>
      <ButtonBase
        aria-describedby={id}
        // onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      >
        {type === "BANKS" ? (
          // <AccountBalance className={classes.bank}/>
          <img src={bankImage} alt="" width={15} height={15} />
        ) : (
          <ReportProblem className={classes.notverified} />
        )}
      </ButtonBase>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onMouseLeave={handleMouseLeave}
        anchorOrigin={{
          vertical: "right",
          horizontal: "top",
        }}
        transformOrigin={{
          vertical: "right",
          horizontal: "top",
        }}
      >
        {type === "BANKS" ? (
          <Typography className={classes.typography}>
            <div>{statusType}</div>
          </Typography>
        ) : (
          <Typography className={classes.typography}>
            <div className={classes.mainText}>
              Your email is currently not verified ?
            </div>
            <div>
              <ButtonBase className={classes.email}>Change Email</ButtonBase>
              <ButtonBase
                className={classes.verify}
                onClick={() => handleResend()}
              >
                Verify Now
              </ButtonBase>
            </div>
          </Typography>
        )}
      </Popover>
    </div>
  );
}

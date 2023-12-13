import React from "react";

import { Paper } from "@material-ui/core";
import styles from "./style.module.css";

const BusinessView = () => {
  return (
    <Paper>
      <div className={"midContainer"}>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <label>Company Name</label>
            <div>
              {/*<img className={styles.userImage} src={data.user_image}/>*/}
            </div>
          </div>

          <div className={"formGroup"}>
            <label>Company Logo</label>
            <div>
              {/*<img className={styles.userImage} src={data.user_image}/>*/}
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

const useStyle = (theme) => ({
  btnSuccess: {
    backgroundColor: theme.palette.success.dark,
    color: "white",
    marginRight: 5,
    marginLeft: 5,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  },
  btnError: {
    backgroundColor: theme.palette.error.dark,
    color: "white",
    marginLeft: 5,
    marginRight: 5,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
});

export default BusinessView;

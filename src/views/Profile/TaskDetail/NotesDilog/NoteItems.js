import React, { memo } from "react";
import { Avatar, Card, CardHeader } from "@material-ui/core";

const NoteItem = ({ note, styles, classes }) => (
  <div className={styles.mainFlex}>
    <div>
      <div style={{ marginLeft: "15px" , fontSize:"14px"}} >{note?.title}</div>
      <Card>
        <CardHeader
          avatar={<Avatar src={note?.userData?.image} />}
          title={<span className={classes.boldTitle}>{note?.userData?.name}</span>}
          subheader={<span>{note?.createdAtText}</span>}
        />
      </Card>
    </div>
    <div className={styles.gaps} />
  </div>
);

export default memo(NoteItem);

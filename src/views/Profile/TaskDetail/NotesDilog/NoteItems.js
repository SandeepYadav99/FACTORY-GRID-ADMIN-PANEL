import React, { memo } from "react";
import { Avatar, Card, CardHeader, Typography } from "@material-ui/core";

const NoteItem = ({ note, styles, classes }) => (
 
    <div >
      <Card style={{margin:"2px"}}>
      <Typography style={{marginLeft: "15px", fontSize: "14px",marginTop:"8px", wordWrap: "break-word"}} >{note?.title}</Typography>
        <CardHeader
          avatar={<Avatar src={note?.userData?.image} />}
          title={<span className={classes.boldTitle}>{note?.userData?.name}</span>}
          subheader={<span>{note?.createdAtText}</span>}
        />
      </Card>
      <div className={styles.gaps} />
    </div>
 
);

export default memo(NoteItem);

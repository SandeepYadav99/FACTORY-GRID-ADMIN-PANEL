
import StatusPill from "../components/Status/StatusPill.component";

export const  renderStatus = (status) => {
    let backgroundColor, textColor, fontSize;

    switch (status) {
      case "ACTIVE":
        backgroundColor = "green";
        textColor = "white";
        fontSize="0.8rem";
        break;
      case "PENDING":
        backgroundColor = "orange";
        textColor = "white";
        fontSize="0.8rem";
        break;
      case "SUSPENDED":
        backgroundColor = "red";
        textColor = "white";
        fontSize="0.8rem";
        break;
      default:
        backgroundColor = "gray"; 
        textColor = "black";
       
    }

    const style = {
      backgroundColor,
      color: textColor,
      fontSize
      //...
    };

    return <StatusPill status={status} style={style} />;
  }
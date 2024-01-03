import React from "react";
import Error from "../assets/img/not_verified.png";
import Normal from "../assets/img/verified.png";
import Alert from "../assets/img/warning.png";
import Review from "../assets/img/sent_blue.svg";

export default function renderImagebyType(status) {
  switch (status) {
    case "VERIFIED":
      return <img src={Normal} height={16} width={16} />;
    case "ALERT":
      return <img src={Alert} height={16} width={16} />;
    case "ERROR":
      return <img src={Error} height={16} width={16} />;
    case "REVIEW":
      return <img src={Review} height={16} width={16} />;
      case "Email":
        return <img src={Alert} height={16} width={16} />
    default:
      return "";
  }
}

export const monthsArr = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
]; 

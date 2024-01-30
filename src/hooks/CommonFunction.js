import React from "react";

// First letter in Caps 
export default function capitalizeFirstLetter(str) {
    return str?.replace(/\b\w/g, function (match) {
        return match?.toUpperCase();
    });
}

// Remove Under Score and first letter in Caps 
export  const formatString = (inputString) => {
    if (!inputString) {
      return "";
    }
  
    return inputString
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };


   export  const formattedDescription =(details)=> details?.description
  ? details.description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
  : null;
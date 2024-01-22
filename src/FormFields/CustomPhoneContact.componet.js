import React, { useCallback } from "react";

import PhoneInput from "react-phone-input-2";

const CustomPhoneContactField = ({
  isError,
  errorText,
  icon,
  label,
  onChange,
  onTextChange,
  inputProps,
  value,
  inputStyle,
  isValid,
  ...rest
}) => {
  // const handleChange = useCallback(
  //   (e) => {
  //     onChange && onChange(e);
  //     onTextChange && onTextChange(e);
  //   },
  //   [onChange, onTextChange]
  // );
  const handleChange = useCallback(
    (phoneNumber, country, e, formattedValue) => {
    
      const countryCodeRegex = /\+(\d+)/;
      const match = formattedValue.match(countryCodeRegex);
      const countryCode = match ? match[1] : null;
      const restOfPhoneNumber = formattedValue.replace(countryCodeRegex, "").replace(/-/g, "");

      // Format the phone number with a space
      const formattedPhoneNumber = countryCode
        ? `+${countryCode} ${restOfPhoneNumber}`
        : formattedValue;

     
      onTextChange && onTextChange(formattedPhoneNumber);
      onChange && onChange(formattedPhoneNumber, country, e, formattedValue);
    },
    [onChange, onTextChange]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <PhoneInput
        defaultErrorMessage={isError}
        inputProps={{
          name: "Phone No",
        }}
        country={"in"}
        // country={country_code ? country_code.toLowerCase() : 'us'}
        value={value}
        onChange={handleChange}
        inputStyle={{
          width: "100%",
          border: errorText ? "1px solid red" : "1px solid #ccc",
        }}
        specialLabel=""
        isValid={isValid}
      />
      {errorText  ? (
        <span style={{ color: "red", textAlign: "right", fontSize: "12px" }}>
        {errorText}
        </span>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default CustomPhoneContactField;

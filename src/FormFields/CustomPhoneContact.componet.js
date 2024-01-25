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

        // Validate phone number based on the selected country
        const isValidPhoneNumber = validatePhoneNumber(formattedPhoneNumber, country);
  
        onChange && onChange(formattedPhoneNumber, country, e, formattedValue, isValidPhoneNumber);
    },
    [onChange, onTextChange]
  );

  const validatePhoneNumber = (phoneNumber, country) => {
    // Add your validation logic here based on the country
    // For example, you can use regular expressions or a library like libphonenumber-js
    // to validate the phone number format.

    // Example validation for the US:
    if (country === "us" || "in") {
      const usPhoneNumberRegex = /^\+1 \d{10}$/;
      return usPhoneNumberRegex.test(phoneNumber);
    }

    // Add more country-specific validation logic as needed

    // Default to true if no validation is implemented for the country
    return true;
  };
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

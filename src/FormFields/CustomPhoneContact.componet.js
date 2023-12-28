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
  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);
      onTextChange && onTextChange(e);
    },
    [onChange, onTextChange]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <PhoneInput
        inputProps={{
          name: "Phone No",
        }}
        country={"in"}
        value={value}
        onChange={handleChange}
        inputStyle={{
          width: "100%",
          border: errorText ? "1px solid red" : "1px solid #ccc",
        }}
        specialLabel=""
        isValid={isValid}
      />
      {errorText ? (
        <span style={{ color: "red", textAlign: "right", fontSize: "12px" }}>
          Admin User Contact Exists
        </span>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default CustomPhoneContactField;

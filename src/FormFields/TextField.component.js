import React, { useCallback, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ReactDOM from "react-dom";
import { Search } from "@material-ui/icons";
const CustomTextField = ({
  isError,
  errorText,
  icon,
  label,
  onChange,
  onTextChange,
  inputProps,
  iconStart,
  ...rest
}) => {
  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);
      onTextChange && onTextChange(e.target.value);
    },
    [onChange, onTextChange]
  );

  return (
    <TextField
      error={isError}
      helperText={errorText}
      label={label}
      InputProps={{
        startAdornment: iconStart ? (
          <InputAdornment position="start">
            {iconStart === "search" ? (
              <Search />
            ) : (
              <img className={"fieldIcon"} src={icon} alt="icon" />
            )}
          </InputAdornment>
        ) : (
          ""
        ),
        endAdornment: icon ? (
          <InputAdornment position="end">
            {icon === "search" ? (
              <Search />
            ) : (
              <img className={"fieldIcon"} src={icon} alt="icon" />
            )}
          </InputAdornment>
        ) : (
          ""
        ),
        ...(inputProps ? inputProps : {}),
      }}
      onChange={handleChange}
      variant={"outlined"}
      margin={"dense"}
      fullWidth={true}
      {...rest}
    />
  );
};

export default CustomTextField;

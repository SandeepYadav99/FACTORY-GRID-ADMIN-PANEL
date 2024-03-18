import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";


const CustomCheckbox = ({ handleChange,value, label, ...rest }) => {
    return (
        <FormControlLabel
            control={<Checkbox
                checked={value ? true : false}
                onChange={(e) => { handleChange(e.target.checked) } }
            />}
            label={label}
            {...rest}
        />);
}

export default CustomCheckbox;

import React, { useState } from "react";
import styles from "./style.module.css";

const CustomRadioLabel = ({
  firstValue,
  secondValue,
  thirdValue,
  name,
  handleChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(false);

  const onValueChange = (event) => {
    const data = event.target.value;
    console.log(data);
    // props.handleChange(data);
    setSelectedOption(data);
    handleChange(data, name);
  };

  return (
    <form style={{ display: "inline-block" }}>
      <div className="radio-group">
        <div>
          <input
            type="radio"
            name={name}
            id={name + "options-one"}
            value={firstValue}
            // checked={!selectedOption}
            onChange={onValueChange}
          />
          <label htmlFor={name + "options-one"} className={"badge"}>
            {firstValue}
          </label>
        </div>
        <div>
          <input
            type="radio"
            name={name}
            id={name + "options-two"}
            value={secondValue}
            //  checked={!selectedOption}
            // checked={selectedOption === secondValue}
            onChange={onValueChange}
          />
          <label htmlFor={name + "options-two"} className={"badge"}>
            {secondValue}
          </label>
        </div>
        {thirdValue && (
          <div>
            <input
              type="radio"
              name={name}
              id={name + "option-three"}
              value={thirdValue}
              //  checked={!selectedOption}
              // checked={selectedOption === secondValue}
              onChange={onValueChange}
            />
            <label htmlFor={name + "option-three"} className={"badge"}>
              {thirdValue}
            </label>
          </div>
        )}
      </div>
    </form>
  );
};

export default CustomRadioLabel;

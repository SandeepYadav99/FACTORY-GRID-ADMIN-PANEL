import React, { useCallback, useState } from "react";
import { Field } from "redux-form";

const initialForm = {
  chooseBadge: "",
  chooseTopBadge: "",
};
const useConfirmationHook = () => {
  const [fileds, setFileds] = useState([initialForm]);
  const [errorData, setErrorData] = useState({});

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "chooseBadge",
      "chooseTopBadge",
   
    ];

    
    required.forEach((val) => {
      // if (
      //   !form?.[val] ||
      //   (Array.isArray(form?.[val]) && form?.[val].length === 0)
      // ) {
      //   errors[val] = true;
      // } else if (["code"].indexOf(val) < 0) {
      //   delete errors[val];
      // }
    });

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [Field, errorData]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = [ ...fileds ];
      if (fieldName === "policy_title") {
       
      } else if (fieldName === "code") {
       
        shouldRemoveError = false;
      } else {
        t[fieldName] = text;
      }

      setFileds(t);

      shouldRemoveError && removeError(fieldName);
    },
    [removeError, fileds, setFileds]
  );


  const addMoreBadge = () => {
    setFileds([...fileds, { chooseBadge: "", chooseTopBadge: "" }]);
  };
  const deleteBadges = (index) => {
    if (fileds.length === 1) {
      return;
    }
    const values = [...fileds];
    values.splice(index, 1);
    setFileds(values);
  };

  return {
    fileds,
    addMoreBadge,
    deleteBadges,
    changeTextData
  };
};

export default useConfirmationHook;

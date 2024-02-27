import React, { useState } from "react";

const initialForm = {
  chooseBadge: "",
  chooseTopBadge: "",
};
const useConfirmationHook = () => {
  const [fileds, setFileds] = useState([initialForm]);

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
  };
};

export default useConfirmationHook;

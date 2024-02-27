import React, { useCallback, useEffect, useState } from "react";

import { serviceManufactureAssignDelete } from "../../../../../services/Badge.service";

import { useParams } from "react-router-dom";
const initialForm = {
  chooseTopBadge: [],
};
const useConfirmationHook = ({ isOpen, handleToggle, badgeId ,badgeIds}) => {
  const { id } = useParams();

  const handleSubmit = useCallback(async () => {
    serviceManufactureAssignDelete({ badge_id: badgeId, id: badgeIds }).then((res) => {
      if (!res?.error) {
        handleToggle();
      }
    });
  }, [id, badgeId]);

  return {
    handleSubmit,
  };
};

export default useConfirmationHook;

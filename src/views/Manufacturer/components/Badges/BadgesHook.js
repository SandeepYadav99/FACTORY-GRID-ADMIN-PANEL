import { useCallback, useState } from "react";

const useBadgesHook = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [types, setTypes] = useState("");
  const toggleIsOpenDialog = useCallback(
    (data) => {
      setIsOpenDialog((e) => !e);
      // setExpireLetter(data?.id)
      setTypes(data)
    },
    [setIsOpenDialog]
  );

  return {
    isOpenDialog,
    toggleIsOpenDialog,
    types
  };
};

export default useBadgesHook;

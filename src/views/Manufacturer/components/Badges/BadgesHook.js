import  { useCallback,  useState } from "react";


const useBadgesHook = () => {

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const toggleIsOpenDialog = useCallback((data) => {
    setIsOpenDialog((e) => !e);
    // setExpireLetter(data?.id)
  }, []);

  return {
  

    isOpenDialog,
    toggleIsOpenDialog,
  };
};

export default useBadgesHook;

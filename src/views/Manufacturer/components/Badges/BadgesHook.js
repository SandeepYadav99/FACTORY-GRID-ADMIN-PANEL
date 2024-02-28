import { useCallback, useEffect, useState } from "react";
import {
  serviceBadgeByUser,
  serviceBadgeLists,
} from "../../../../services/Badge.service";
import { useParams } from "react-router-dom";
const useBadgesHook = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [types, setTypes] = useState("");
  const [badges, setBadges] = useState([]);
  const [badgeId, setBadgeId] = useState("");
  const [badgeIds, setBadgeIds]=useState()
  const { id } = useParams();
  useEffect(() => {
    
    serviceBadgeLists({
      user_id: id,
      row: null,
      order: null,
      query: "",
      query_data: null,
      index: 1,
    }).then((res) => {
     
      if (!res?.error) {
        setBadges(res?.data);
      }
    });
  }, [isOpen, isOpenDialog, setBadges]);

  
  const toggleIsOpenDialog = useCallback(
    (data, badgeId) => {
     
      setIsOpenDialog((e) => !e);
      // setExpireLetter(data?.id)
      // setTypes(data);
      setBadgeId(data);
      setBadgeIds(badgeId)
    },
    [setIsOpenDialog, setBadgeId, setBadgeIds]
  );

  const toggleIsOpen = useCallback(
    (data) => {
      setIsOpen((e) => !e);
      // setExpireLetter(data?.id)
      // setTypes(data);
    
    },
    [setIsOpenDialog]
  );
  return {
    isOpenDialog,
    toggleIsOpenDialog,
    types,
    badges,
    isOpen,
    toggleIsOpen,
    setBadgeId,
    badgeId,
    badgeIds
  };
};

export default useBadgesHook;

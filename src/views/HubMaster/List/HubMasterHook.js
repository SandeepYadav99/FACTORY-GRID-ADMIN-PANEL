/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  actionFetchHubMaster,
  actionSetPageHubMasterRequests,
} from "../../../actions/HubMaster.action";

const useHubMasterHook = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editId, setEditId] = useState("");
  const dispatch = useDispatch();
  const isMountRef = useRef(false);

  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
    all,
  } = useSelector((state) => state.hubMaster);

  useEffect(() => {
    dispatch(
      actionFetchHubMaster(
        1,
        {},
        {
          query: isMountRef.current ? query : null,
          query_data: isMountRef.current ? queryData : null,
        }
      )
    );
    isMountRef.current = true;
  }, []);

  useEffect(() => {}, [setEditId]);

  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageHubMasterRequests(type)); // actionSetPageBadgeRequests
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      // dispatch(actionSetPageAdminUserRequests(1));
      dispatch(
        actionFetchHubMaster(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
      // dispatch(actionFetchAdminUser(1, sortingData))
    },
    [sortingData, query, queryData]
  );

  const handleFilterDataChange = useCallback(
    (value) => {
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      queryFilter("SEARCH_TEXT", value);
    },
    [queryFilter]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {
      dispatch(actionSetPageHubMasterRequests(1));
      dispatch(
        actionFetchHubMaster(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
          }
        )
      );
    },
    [query, queryData]
  );

  const handleRowSize = (page) => {};

  const handleDelete = useCallback(
    (id) => {
      // dispatch(actionDeletePolicyList(id));
      // setSidePanel(false);
      // setEditData(null);
    },
    [setEditData, setSidePanel]
  );

  const handleEdit = useCallback((all) => {
    setSidePanel((e) => !e);
    setEditData(all);
    setEditId(all?.id);
  }, []);

  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      // setEditData(data?.id);
    },
    [setSidePanel, setEditData]
  );

  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);

     
      
    },
    [setEditData, setSidePanel]
  );

  const handleEditHubMaster = useCallback(
    (data) => {
      setSidePanel((e) => !e);

      setEditId(data);
    
        setEditData(null);
      
    },
    [setEditData, setSidePanel]
  );

  const handleSideOpenSide = useCallback(
    (data) => {
      setSidePanel((e) => !e);
   
    },
    [setEditData, setSidePanel]
  );

  const handleCloseSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
    },
    [setEditData, setSidePanel]
  );

  const handleViewDetails = useCallback((data) => {
    // historyUtils.push(RouteName.LOCATIONS_DETAILS + data.id); //+data.id
  }, []);

  const handleCreate = useCallback(() => {
    // historyUtils.push(RouteName.LOCATIONS_CREATE);
  }, []);

  const handleFileView = useCallback((data) => {
    // window.open(data?.document, "_blank");
  }, []);

  const configFilter = useMemo(() => {
    return [
      { label: "Created On", name: "createdAt", type: "date" },
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["INACTIVE", "ACTIVE"],
      },
    ];
  }, []);

  return {
    handlePageChange,

    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    handleCreate,
    handleToggleSidePannel,
    handleFileView,
    editId,
    handleSideOpenSide,
    handleCloseSideToggle,
    handleEditHubMaster,
  };
};

export default useHubMasterHook;

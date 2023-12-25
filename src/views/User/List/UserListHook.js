/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { actionCreateCustomers, actionUpdateCustomers } from "../../../actions/Customers.action";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import { actionFetchProviderUser, actionSetPageProviderUserRequests } from "../../../actions/ProviderUser.action";

const useUserListHook = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);

  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
    all
  } = useSelector((state) => state?.provider_user);



  useEffect(() => {
    dispatch(
      actionFetchProviderUser(
        1,
        {},
        {
          query: isMountRef.current ? query : null,
          query_data: isMountRef.current ? queryData : null,
        }
      )
    );
    isMountRef.current = true;
    console.log("Action1")
  }, []);
  console.log("Action2")
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
     dispatch(actionSetPageProviderUserRequests(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
     
      if (type == "CREATE") {
        dispatch(actionCreateCustomers(data));
      } else {
        dispatch(actionUpdateCustomers(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageAdminUserRequests(1));
      dispatch(
        actionFetchProviderUser(1, sortingData, {
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
      console.log("_handleFilterDataChange", value);
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      console.log("_handleSearchValueChange", value);
      queryFilter("SEARCH_TEXT", value);
    },
    [queryFilter]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(actionSetPageProviderUserRequests(1));
      dispatch(
        actionFetchProviderUser(
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



  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDelete = useCallback(
    (id) => {
      // dispatch(actionDeletePolicyList(id));
      // setSidePanel(false);
      // setEditData(null);
    },
    [setEditData, setSidePanel]
  );

  const handleEdit = useCallback((type) => {
    historyUtils.push(`${RouteName.USER_PROFILE}?id=${type?.id}`);
  }, []);
  
  const handleProfile = useCallback((type) => {
    historyUtils.push(`${"/profile/"}?id=${type?.id}`);
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
      // historyUtils.push(RouteName.LOCATIONS_UPDATE + data?.id);
    },
    [setEditData, setSidePanel]
  );

  const handleViewDetails = useCallback((data) => {
    // historyUtils.push(RouteName.LOCATIONS_DETAILS + data.id); //+data.id
  }, []);

  const handleCreate = useCallback(() => {
     historyUtils.push(RouteName.USER_PROFILE);
  }, []);

  const handleFileView = useCallback((data) => {
    // window.open(data?.document, "_blank");
  }, []);
  
  const configFilter = useMemo(() => {
    return [
      {label: 'Request Date', name: 'createdAt', type: 'date', options:{maxDate: new Date()}},
      {label: 'Status', name: 'status', type: 'select', fields: ['PENDING', 'ACTIVE']}
    ];
  }, []);

  return {
    handlePageChange,
    handleDataSave,
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
    handleProfile
  };
};

export default useUserListHook;

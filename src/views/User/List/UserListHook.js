/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateCustomers,
  actionUpdateCustomers,
} from "../../../actions/Customers.action";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import {
  actionFetchProviderUser,
  actionSetPageProviderUserRequests,
} from "../../../actions/ProviderUser.action";
import { format } from "date-fns";

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
    all,
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
  }, []);

  const handlePageChange = useCallback((type) => {
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
      dispatch(
        actionFetchProviderUser(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
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

  const handleEdit = useCallback((type) => {
    historyUtils.push(`${RouteName.USER_PROFILE}${type?.id}`);
  }, []);

  const handleProfile = useCallback((type) => {
    historyUtils.push(`${"/profile/"}?id=${type?.id}`);
  }, []);
  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
    },
    [setSidePanel, setEditData]
  );

  const handleCreate = useCallback(() => {
    historyUtils.push(RouteName.USER_PROFILE_CREATE);
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Created On",
        name: "createdAt",
        type: "date",
        options: { maxDate: new Date() },
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["PENDING", "ACTIVE"],
      },
    ];
  }, []);

  return {
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSortOrderChange,
    handleEdit,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    handleCreate,
    handleToggleSidePannel,

    handleProfile,
  };
};

export default useUserListHook;

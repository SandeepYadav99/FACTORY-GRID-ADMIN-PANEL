/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { actionFetchTopManufacture, actionSetPageTopManufactureRequests } from "../../actions/TopManufacture.action";


const useTopManufacatureHook = ({}) => {
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
  } = useSelector((state) => state.topManufacture);

  useEffect(() => {
    dispatch(
      actionFetchTopManufacture(
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
    dispatch(actionSetPageTopManufactureRequests(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      dispatch(
        actionFetchTopManufacture(1, sortingData, {
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
      dispatch(actionSetPageTopManufactureRequests(1));
      dispatch(
        actionFetchTopManufacture(
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

  // Edit
  const handleEdit = useCallback(
    (all) => {
      setSidePanel((e) => !e);
      setEditData(all);
      setEditId(all?.id);
    },
    [setSidePanel, setEditData, setEditId]
  );
  // Create
  const handleOpenSidePanel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      setEditData(null);
      setEditId("");
    },
    [setEditId, setSidePanel]
  );


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
    handleSortOrderChange,
    handleEdit,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    editId,
    handleOpenSidePanel,
  };
};

export default useTopManufacatureHook;

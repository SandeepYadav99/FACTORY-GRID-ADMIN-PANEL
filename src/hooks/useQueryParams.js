import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const getQueryParam = (param) => queryParams.get(param);

  return {
    getQueryParam,
  };
};

export default useQueryParams;

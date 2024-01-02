/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

import { serviceBadgeIndustry } from "../../../services/Badge.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {
  serviceHubMasterCreate,
  serviceHubMasterDetail,
  serviceHubMasterUpdate,
} from "../../../services/HubMaster.service";
import constants from "../../../config/constants";
import { useDispatch } from "react-redux";
import { actionFetchHubMaster } from "../../../actions/HubMaster.action";

const initialForm = {
  name: "",
  geofence: "",
  industry_id: [],
  featured: false,
  status: false,
};

const useHubMasterCreateHook = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
}) => {
  const [isLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit] = useState(false);
  const includeRef = useRef(null);
  const [geofence, setGeoFence] = useState([]);
  const [listData, setListData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    serviceBadgeIndustry({ id: empId }).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (empId) {
      serviceHubMasterDetail({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res.data;

          setForm({
            ...form,
            name: data?.name,
            industry_id: data?.industryData,
            featured: data?.featured === "YES",

            status: data?.status === constants.GENERAL_STATUS.ACTIVE,
          });
          setGeoFence(
            data?.geofence?.coordinates
              ? data?.geofence?.coordinates[0]?.map((coordinate) => [
                  ...coordinate,
                ])
              : []
          );
        } else {
        }
      });
    }
  }, [empId]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  const handleCoordinate = useCallback(
    (data) => {
      setGeoFence(data);
    },
    [setGeoFence]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "industry_id"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    const industryID =
      Array.isArray(form.industry_id) && form.industry_id.length > 0
        ? form.industry_id.map((item) => item.id || item._id)
        : [];

    const updateData = {
      name: form?.name,
      industry_id: industryID,
      geofence_coordinates: {
        type: "Polygon",
        coordinates: geofence ? geofence : [],
      },
      featured: form?.featured ? "YES" : "NO",
      status: form?.status ? "ACTIVE" : "INACTIVE",
    };
    if (empId) {
      updateData.id = empId;
    }

    const req = empId
      ? serviceHubMasterUpdate(updateData)
      : serviceHubMasterCreate(updateData); //
    const res = await req;

    if (!res.error) {
      handleToggleSidePannel();
      //  window.location.reload();
      dispatch(actionFetchHubMaster(1));
    } else {
      SnackbarUtils.error(res.message);
    }

    setIsSubmitting(false);
  }, [form, isSubmitting, setIsSubmitting, empId, handleToggleSidePannel]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
      await submitToServer();
      // window.location.reload();
    }
  }, [checkFormValidation, setErrorData, form, submitToServer, empId]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      console.log(text);

      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text;
      } else if (fieldName === "industry_id") {
        t[fieldName] = text.filter((item, index, self) => {
          return (
            index ===
            self.findIndex((i) => i.id === item.id && i._id === item._id)
          );
        });
      } else {
        t[fieldName] = text;
      }

      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form, setForm]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    listData,
    errorData,
    isEdit,
    handleDelete,
    includeRef,
    handleReset,
    empId,
    showPasswordCurrent,
    setShowPasswordCurrent,

    geofence,
    setGeoFence,
    handleCoordinate,
  };
};

export default useHubMasterCreateHook;

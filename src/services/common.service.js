import { toast } from "react-hot-toast";
import { startCase } from "lodash";

import APIrequest from "helpers/request.helper";
import logger from "helpers/logger";

export const commonService = async ({
  apiEndPoint,
  bodyData,
  isToast = true,
  toastType = { success: false, error: true },
  toastMessage = { success: "", error: "" },
  queryParams,
  extraDataKeys = [],
  headers = null,
  isFormData = false,
}) => {
  try {
    const payload = {
      ...apiEndPoint,
      isFormData,
    };

    if (bodyData) {
      payload.bodyData = bodyData;
    }

    if (queryParams) {
      payload.queryParams = queryParams;
    }
    if (headers) {
      payload.headers = headers;
    }

    if (apiEndPoint.method === "GET") {
      toastType = {
        ...toastType,
        success: false,
      };
    }

    const response = await APIrequest(payload);

    if (isToast && toastType.success) {
      toast.success(
        toastMessage.success || startCase(response?.data?.message ?? ""),
        {
          id: "success",
        },
      );
    }

    return {
      status: true,
      message: response?.data?.message,
      data: response?.data ?? [],
      extraData: extraDataKeys
        ? Object.assign(
            {},
            ...extraDataKeys.map((key) => ({
              [key]: response?.data?.[key],
            })),
          )
        : {},
    };
  } catch (err) {
    const errorObj = JSON?.parse?.(err?.message);
    if (isToast && toastType.error) {
      toast.error(
        toastMessage.error || startCase(errorObj?.data?.message ?? ""),
        {
          id: "error",
        },
      );
    }
    logger("commonService", errorObj);
    throw Error(err);
  }
};

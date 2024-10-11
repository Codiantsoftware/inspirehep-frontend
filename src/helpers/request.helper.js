import axios from "axios";
import { API_ENDPOINT_V1 } from "config/api.config";

axios.defaults.headers.post["Content-Type"] = "application/json";

const APIrequest = async ({
  method,
  url,
  baseURL,
  queryParams,
  bodyData = {},
  headers = {},
  isFormData = false,
  formHeaders
}) => {
  let apiToken;
  // = store.getState()?.auth?.token
  try {
    const axiosConfig = {
      method: method || "GET",
      baseURL: API_ENDPOINT_V1,
      headers: {
        "X-Frame-Options": "sameorigin"
        // Cookie: refreshToken,
        // timezone: 'Asia/Kolkata'
        // language,
      },
      withCredentials: false
    };

    if (formHeaders) {
      axiosConfig.headers = { ...axiosConfig.headers, ...formHeaders };
    }

    if (baseURL) {
      axiosConfig.baseURL = baseURL;
    }

    if (url) {
      axiosConfig.url = url;
    }

    if (queryParams) {
      const queryParamsPayload = {};
      for (const key in queryParams) {
        if (Object.hasOwnProperty.call(queryParams, key)) {
          let element = queryParams[key];
          if (typeof element === "string") {
            element = element.trim();
          }
          if (!["", null, undefined, NaN].includes(element)) {
            queryParamsPayload[key] = element;
          }
        }
      }
      axiosConfig.params = queryParamsPayload;
    }

    let bodyPayload = {};

    if (bodyData && !isFormData) {
      for (const key in bodyData) {
        if (Object.hasOwnProperty.call(bodyData, key)) {
          let element = bodyData?.[key];
          if (typeof element === "string") {
            element = element?.trim?.();
          }
          if (![null, undefined, NaN].includes(element)) {
            bodyPayload[key] = element;
          }
        }
      }
    } else {
      bodyPayload = bodyData;
    }

    axiosConfig.data = bodyPayload;

    axiosConfig.headers = {};
    if (apiToken) {
      axiosConfig.headers = {
        ...axiosConfig.headers,
        "access-token": apiToken,
        timezone: "Asia/Kolkata",
        ...headers
      };
    }
    const res = await axios(axiosConfig);
    return res;
  } catch (error) {
    const errorRes = error?.response;
    throw new Error(JSON.stringify(errorRes));
  }
};

export default APIrequest;

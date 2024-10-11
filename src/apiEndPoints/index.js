import { API_ENDPOINT_V1 } from "config/api.config";

const API_ENDPOINT = API_ENDPOINT_V1;

export const ENDPOINT_LISTS = {
  getDocumentByTag: (tag) => ({
    url: `${API_ENDPOINT}/api/documents/${tag}/`,
    method: "GET"
  }),
  getDocumentById: (tag, documentId) => ({
    url: `${API_ENDPOINT}/api/identifier-by-id/${tag}/${documentId}/`,
    method: "GET"
  })
};

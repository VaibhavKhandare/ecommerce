import { getDummyResponse } from "../data/dummyData";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
const USE_DUMMY = process.env.REACT_APP_USE_DUMMY === "true";

export const getAPI = (url, params) => {
  const path = url.startsWith("/") ? url : `/${url}`;
  const dummy = getDummyResponse(path, params);
  if (USE_DUMMY && dummy != null) return Promise.resolve(dummy);
  const fullUrl = `${BASE_URL}${path}?${new URLSearchParams(params || {})}`;
  return fetch(fullUrl, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  })
    .then((res) => res.json())
    .catch(() => (dummy != null ? dummy : []));
};

export const postAPI = (url, body) => {
  if (USE_DUMMY) return Promise.resolve({ status: 0, message: "Demo mode: no backend" });
  return fetch(`${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.json())
    .catch((err) => console.log("error", err));
};

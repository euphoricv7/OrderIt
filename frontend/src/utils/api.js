import axios from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: "http://localhost:7777/api/v1",
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

export default api;
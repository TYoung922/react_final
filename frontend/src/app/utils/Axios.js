import axios from "axios";
import {
  AXIOS_AUTH_URL,
  AXIOS_FOLLOW_URL,
  AXIOS_YODELS_URL,
} from "../constants/config";

const Ax_Auth = axios.create({
  baseURL: AXIOS_AUTH_URL,
  withCredentials: true,
});

const Ax_Yodels = axios.create({
  baseURL: AXIOS_YODELS_URL,
  withCredentials: true,
});

const Ax_follow = axios.create({
  baseURL: AXIOS_FOLLOW_URL,
  withCredentials: true,
});

export { Ax_Auth, Ax_Yodels, Ax_follow };

import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 1500,
  headers: {},
});

export default request;

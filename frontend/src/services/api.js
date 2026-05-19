import axios from "axios";

const API = axios.create({
  baseURL: "https://sms-project-backend-13kz.onrender.com",
});

export default API;

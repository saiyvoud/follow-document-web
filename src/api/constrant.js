import axios from "axios";
import { getCookie } from "../lib/js-cookie";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const user = getCookie('user');

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser?.token && config.headers) {
          config.headers.Authorization = `Bearer ${parsedUser.token}`;
        }
      } catch (error) {
        console.error("Failed to parse user cookie", error);
      }
    }
    return config;
  },
  (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

export default api;

export const FollowDocument = {
  await: "ພະແນກຂາເຂົ້າ-ຂາອອກ",
  progress: "ເລຂາອະທິການ",
  padding: "ອະທິການຫລືຮອງ",
  continue: "ກັບຄືນໄປທີ່ເລຂາອະທິການ",
  success: "ກັບມາທີ່ພະແນກຂາເຂົ້າ-ຂາອອກ",
  done: "ມາຮັບເອກະສານແລ້ວ",
}
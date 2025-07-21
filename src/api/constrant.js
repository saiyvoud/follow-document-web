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
  await: "ພະແນກຂາເຂົ້າ-ຂາອອກ", //ລໍຖ້າ
  progress: "ເລຂາອະທິການ", //ກຳລັງດຳເນີນການ
  padding: "ອະທິການຫລືຮອງ", //ກຳລັງດຳເນີນການ
  continue: "ກັບຄືນໄປທີ່ເລຂາອະທິການ",  //ກຳລັງດຳເນີນການ
  success: "ກັບມາທີ່ພະແນກຂາເຂົ້າ-ຂາອອກ", //ສຳເລັດ
  done: "ມາຮັບເອກະສານແລ້ວ", //ສຳເລັດ
}
export const ConvertStatus = (status) => {
  switch (status) {
    case FollowDocument.await:
      return "ລໍຖ້າ";
    case FollowDocument.progress:
      return "ກຳລັງດຳເນີນການ";
    case FollowDocument.padding:
      return "ກຳລັງດຳເນີນການ";
    case FollowDocument.continue:
      return "ກຳລັງດຳເນີນການ";
    case FollowDocument.success:
      return "ສຳເລັດ";
    case FollowDocument.done:
      return "ສຳເລັດ";
    default:
      return "ລໍຖ້າ";
  }
}

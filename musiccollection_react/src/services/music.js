import axios from "axios";
import { API_URL } from "../constants/config";

export default {
  getAllMusicList: (type, search, page, pageSize) => {
    return axios.get(API_URL.MUSIC_COLLECTION, {
      params: {
        type: type,
        search: search,
        page: page,
        limit: pageSize
      },
    });
  },
  getMusicDetails: (id) => {
    return axios.get(`${API_URL.MUSIC_COLLECTION}/${id}`);
  },
};

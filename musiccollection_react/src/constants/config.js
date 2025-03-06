const BASE_URL = process.env.REACT_APP_BASE_URL;

export const API_URL = {
  MUSIC_COLLECTION: `${BASE_URL}/collections`,
};

export const ACTION_TYPES = {
    SHOW_LOADER: "SHOW_LOADER",
    HIDE_LOADER: "HIDE_LOADER",
  };

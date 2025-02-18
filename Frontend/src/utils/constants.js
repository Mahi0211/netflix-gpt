export const BG_IMG =
  "https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_large.jpg";

export const USER_AVATAR = "https://example.com/jane-q-user/profile.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";

export const LANG_CHANGE = [
  {
    identifier: "English",
  },
  {
    identifier: "Hindi",
  },
  {
    identifier: "Tamil",
  },
  {
    identifier: "Kannada",
  },
  {
    identifier: "Spanish",
  },
];

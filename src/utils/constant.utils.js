// font family

import { StatusBar } from "react-native";

// App Constants

export const serverUrl = () => {
  let endpoint = "http://143.110.245.135/api/";
  return endpoint;
};

export const statusbar = StatusBar.currentHeight;

export const btnBlue = ["#6C4DDA", "#522ED2"];

export const btnGold = ["#FFBF35", "#FFA900"];

export const btnPing = ["#FF9FC7", "#F32878"];

export const btnLightBlue = ["#466FFF", "#3462FF"];

export const tabs = ["All Events", "Wall"];


export const invitetabs = ["Musician", "Band", "Music School"];

export const Days = ["THIS WEEK", "THIS MONTH"];

export const type = [
  { label: "Online", value: 1 },
  { label: "Offline", value: 2 },
];

export const categories = [
  { label: "Contest", value: 1 },
  { label: "Orchestra", value: 2 },
  { label: " Bhajan ", value: 3 },
];

export const search_type = [
  { label: "Recent", value: "recent" },
  { label: "Favorites", value: "i_follow" },
  { label: "Opportunities ", value: "interest" },
];

export const multiSelectCheckbox = (state, item) => {
  const index = state.indexOf(item.value);
  if (index !== -1) {
    state.splice(index, 1);
  } else {
    state.push(item.value);
  }
  return state;
};


import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Models } from "./imports.utils";
import * as DocumentPicker from "expo-document-picker";
import useCalendar from "@atiladev/usecalendar";
import moment from "moment";
const {
  getPermission,
  createCalendar,
  addEventsToCalendar,
  deleteCalendar,
  openSettings,
  isThereEvents,
} = useCalendar("MyExpoApp", "#5351e0", "Calendar_Example_Name");

export const { width, height } = Dimensions.get("window");

export const getBaseURL = () => {
  // let baseURL = 'https://api.hellaviews.com';
  let baseURL = "http://192.168.1.24:8001";
  if (process.env.REACT_APP_NODE_ENV === "development") {
    // baseURL = 'http://localhost:8001';
  } else if (process.env.REACT_APP_NODE_ENV === "stage") {
    // baseURL = 'https://stage.hellaviews.com';
  }
  return baseURL;
};

export const useSetState = (initialState) => {
  const [state, setState] = useState(initialState);

  const newSetState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  return [state, newSetState];
};

export const capitalizeFLetter = (string = "") => {
  if (string.length > 0) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
};

export const Width = (value) => {
  return (value * width) / 100;
};

export const Height = (value) => {
  return (value * height) / 100;
};

export const getItem = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return data;
    } else {
      null;
    }
  } catch (error) {
    return null;
  }
};

export const setItem = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    return null;
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    return null;
  }
};
export const formatDate = (date, type) => {
  if (type == "time") {
    return moment(date).format("hh:mm a");
  } else {
    return moment(date).format("MMM DD, YY h:mm a");
  }
};

export const checkURL = (url) => {
  if (url.match(/\.(jpeg|jpg|gif|png|JPEG|JPG|GIF|PNG|HEIC|heic)$/) != null) {
    return "image";
  } else if (url.match(/\.(mp4|MP4|mov|MOV|HEVC|hevc)$/) != null) {
    return "video";
  } else if (url.match(/\.(pdf|docs|xls|xlsx|doc|txt|ppt|pptx)$/) != null) {
    return "docs";
  }
};

export const convertDateToTime = (dates) => {
  const date = new Date(dates);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour time format
  const formattedHours = hours % 12 || 12;

  const formattedTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")} ${amOrPm}`;

  // Example: "08:19 PM"
  return formattedTime;
};

export const uploadImage = async () => {
  try {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const uploadFile = async () => {
  try {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await DocumentPicker.getDocumentAsync({
      mediaTypes: "pdf/*",
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const locations = async () => {
  try {
    const result = await Models.general.location();
    const data = result.locations?.map((item) => {
      return { label: item.name, value: item.id };
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTimeDifference = (pastDate) => {
  const currentDate = new Date(); // Current date
  const timeDifference = currentDate - new Date(pastDate); // Time difference in milliseconds

  const secondsDifference = Math.floor(timeDifference / 1000); // Convert milliseconds to seconds
  const minutesDifference = Math.floor(secondsDifference / 60); // Convert seconds to minutes
  const hoursDifference = Math.floor(minutesDifference / 60); // Convert minutes to hours
  const daysDifference = Math.floor(hoursDifference / 24); // Convert hours to days
  const monthsDifference = Math.floor(daysDifference / 30); // Approximation for months

  if (monthsDifference > 0) {
    return `${monthsDifference} months ago`;
  } else if (daysDifference > 0) {
    return `${daysDifference} days ago`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference} hours ago`;
  } else if (minutesDifference > 0) {
    return `${minutesDifference} minutes ago`;
  } else {
    return `${secondsDifference} seconds ago`;
  }
};

export const add_event_calender = async (title, startDate, endDate) => {
  const granted = await getPermission();
  if (granted) {
    await createCalendar();
    try {
      addEventsToCalendar(title, new Date(startDate), new Date(endDate));
    } catch (e) {}
  } else {
    openSettings();
  }
};

export const isCloseDatePassed = (closeDate) => {
  const currentDate = new Date();
  const closeDateTime = new Date(closeDate);

  return currentDate < closeDateTime;
};

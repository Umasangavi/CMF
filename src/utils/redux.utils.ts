import store from "../store/store";
import { USER_DETAILS, RESET } from "./types.utils";

//driver

export const user_details = (payload: object) =>
  store.dispatch({
    type: USER_DETAILS,
    payload: payload,
  });

export const resetReduxState = (payload: object) => {
  store.dispatch({
    type: RESET,
    payload,
  });
};

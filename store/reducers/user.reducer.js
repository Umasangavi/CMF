import { USER_DETAILS } from "../../utils/types.utils";

const initialState = {
  user_detail: {},
};

const UserReducer = (state = initialState, action) => {
console.log('✌️action --->', action);
  switch (action.type) {
    case USER_DETAILS:
      return { ...state, user_detail: action.payload };
    default:
      return state;
  }
};

export default UserReducer;

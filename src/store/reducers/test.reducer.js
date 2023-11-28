import { TEST_ACTION } from "../../utils/types.utils";

const initialState = {
  test: "test",
  foo: "bar",
};

const TestReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_ACTION:
      let newState = { ...state };
      newState = { ...newState, ...action.payload };
      return newState;
    default:
      return state;
  }
};

export default TestReducer;

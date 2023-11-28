import { combineReducers } from 'redux';
import testReducer from './test.reducer';
import UserReducer from './user.reducer';



const combinedReducer = combineReducers({
  test: testReducer,
  user:UserReducer
 
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    return combinedReducer(action.type === 'RESET' ? undefined : state, action);
  } else {
    return combinedReducer(state, action);
  }
};

export default rootReducer;

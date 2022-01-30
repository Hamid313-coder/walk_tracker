import { SET_USER_INFO } from "../actions/UserInfoActions";

const initialState = {
  gender: null,
  height: null,
};
const UserInfoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        gender: action.gender,
        height: action.userHeight,
      };
    default:
      return state;
  }
};

export default UserInfoReducer;

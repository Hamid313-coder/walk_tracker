export const SET_USER_INFO = "SET_USER_INFO";

export const setUserInfo = (gender: string, userHeight: number) => {
  return { type: SET_USER_INFO, gender, userHeight };
};

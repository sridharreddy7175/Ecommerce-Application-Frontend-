import Axios from "axios";

// Login Action
export const GET_USERS_LOGIN = "USERS_LOGIN";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILED = "GET_USERS_FAILED";

//Action creators Login
export const getUsersLogin = () => {
  return {
    type: GET_USERS_LOGIN,
  };
};
export const getUsersSuccess = (users) => {
  return {
    type: GET_USERS_SUCCESS,
    users,
  };
};
export const getUsersFailed = (error) => {
  return {
    type: GET_USERS_FAILED,
    error,
  };
};

//Thunk Action
export function getUsers(userData) {
  return (dispatch) => {
    dispatch(getUsersLogin());
    Axios.post("http://localhost:5000/api/user/signin",userData)
      .then((response) => response.json())
      .then((users) => {
        console.log(users);
        dispatch(getUsersSuccess(users));
      })
      .catch((err) => {
        dispatch(getUsersFailed(err));
      });
  };
}

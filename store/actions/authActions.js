import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://192.168.100.215/api/"
});

const setAuthToken = token => {
  if (token) {
    return AsyncStorage.setItem("token", token)
      .then(
        () => (axios.defaults.headers.common.Authorization = `jwt ${token}`)
      )
      .catch(err => alert(err));
  } else {
    return AsyncStorage.removeItem("token")
      .then(() => {
        delete axios.defaults.headers.common.Authorization;
      })
      .catch(err => alert(err));
  }
};

export const checkForExpiredToken = () => {
  return dispatch => {
    AsyncStorage.getItem("token").then(token => {
      if (token) {
        const currentTime = Date.now() / 1000;
        const user = jwt_decode(token);
        if (user.exp >= currentTime) {
          setAuthToken(token).then(() => dispatch(setCurrentUser(user)));
        }
      } else {
        logout();
      }
    });
  };
};

export const login = (userData, navigation) => {
  return dispatch => {
    instance
      .post("login/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token).then(() =>
          dispatch(setCurrentUser(decodedUser))
        );
        console.log(decodedUser);
      })

      .catch(err => console.error(err.response));
  };
};

export const signup = (userData, navigation) => {
  return dispatch => {
    instance
      .post("register/", userData)
      .then(res => res.data)
      .then(() => {
        dispatch(login(userData));
      })
      .catch(err => console.error(err.response));
  };
};

export const logout = () => {
  setAuthToken();
  return setCurrentUser(null);
};

const setCurrentUser = user => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_CURRENT_USER, payload: user });
    console.log(user);

    if (user) {
      dispatch(fetchProfile());
    }
  };
};

export const fetchProfile = () => {
  return dispatch => {
    instance
      .get(`profile/`)
      .then(res => {
        return res.data;
      })
      .then(profile => {
        console.log(profile);
        return dispatch({ type: actionTypes.FETCH_PROFILE, payload: profile });
      })

      .catch(err => {
        //dispatch(console.log(err.response));
      });
  };
};

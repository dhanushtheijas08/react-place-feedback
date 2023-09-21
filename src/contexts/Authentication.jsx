import React, { createContext, useContext, useEffect, useReducer } from "react";
import { fetchUserData } from "../hooks/fetchUserData.js";
const authenticationContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
  isCorrectUser: null,
  userData: null,
  currentUser: null,
};
export default function AuthenticationContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchUserData();
      dispatch({ type: "account/dataLoaded", payload: data });
    }
    fetchData();
  }, []);

  function reducer(state, action) {
    switch (action.type) {
      case "account/dataLoaded":
        return { ...state, userData: action.payload };
      case "account/login":
        const singleUserData = {
          userName: action.payload.name,
          password: action.payload.password,
        };
        if (isCorrectUser(singleUserData, state.userData)) {
          return {
            ...state,
            user: action.payload.name,
            isAuthenticated: true,
            isCorrectUser: "yes",
            currentUser: singleUserData,
          };
        }
        return { ...state, isCorrectUser: "no" };
      case "account/logout":
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          isCorrectUser: null,
        };
      case "account/createUser":
        return {
          ...state,
          user: action.payload.userName,
          isAuthenticated: true,
          isCorrectUser: "yes",
          currentUser: action.payload,
        };
      default:
        return { ...state };
    }
  }
  function login(name, password) {
    return dispatch({ type: "account/login", payload: { name, password } });
  }
  function logout() {
    return dispatch({ type: "account/logout" });
  }
  function createUser(userData) {
    return dispatch({ type: "account/createUser", payload: userData });
  }
  function isCorrectUser(singleUserData, allUserData) {
    for (const user of allUserData) {
      if (
        user.userName === singleUserData.userName &&
        user.password === singleUserData.password
      ) {
        return true;
      }
    }
    return false;
  }
  return (
    <authenticationContext.Provider
      value={{ state, login, logout, createUser }}
    >
      {children}
    </authenticationContext.Provider>
  );
}
export function useAuthentication() {
  const context = useContext(authenticationContext);
  if (context === undefined)
    throw new Error("Authentication Context is used above the parent");
  return context;
}

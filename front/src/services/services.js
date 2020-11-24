import React from 'react';
import axios from "axios";
import decode from "jwt-decode";



// get user's details from BDD
export const getUserDetails = async () => {
  const token = localStorage.getItem("token");
  const { userID } = decode(token);

  const url = `http://localhost:4040/allpeople/userDetails/${userID}`;
  const results = await axios({
    method: "GET",
    url: url,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
  const details = results.data[0];
  return details;
};

// Check if user is logged
export const isLogged = () => {

  // 1. stock token from localstorage
  const token = localStorage.getItem("token");
  // 2. verify if there is a token
  if (!token) {
    return false;
  }
  // 3. verify if the token has been expired
  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }
  const { userType } = decode(token);
  return userType;
};

// store user's details
export const userDetails = () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const {
        userID,
        userType,
        email,
        first_name,
        last_name,
        logo,
        phone,
        description_compagny,
        compagnyID,
      } = decode(token);
      return {
        userType,
        userID,
        email,
        first_name,
        last_name,
        phone,
        description_compagny,
        compagnyID,
        logo,
        isLogged: true,
      };
    }
  } catch (err) {
    console.log("No user connected: " + err);
    const isLogged = false;
    return isLogged;
  }
};

// Redirect user towards his profile page once log in
export const goToUserProfilePage = (userType, userID) => {
  switch (userType) {
    case "admin":
      return window.location.replace(`/admin/${userID}`);
    case "user":
      return window.location.replace(`/user/${userID}`);
    case "compagny":
      return window.location.replace(`/compagny/${userID}`);
    default:
      return window.location.replace("/");
  }
};
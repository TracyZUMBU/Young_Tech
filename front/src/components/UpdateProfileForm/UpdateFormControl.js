import React, {useEffect, useState} from "react";
import UpdateAdminProfile from "./UpdateAdminProfile";
import UpdateCompagnyProfile from "./UpdateCompagnyProfile";
import UpdateUserProfile from "./UpdateUserProfile";


const getUserDetails = require ("../../services/services")

const UpdateFormControl = (props) => {
  const userID = localStorage.getItem("userId")
  const [myDetails, setMyDetails] = useState({})

  useEffect(() => {
    async function fetchData() {
      const UserDetails = await getUserDetails.getUserDetails(userID);
       setMyDetails(UserDetails)
       }
       fetchData();
  }, [myDetails])

  const { userType, ...rest } = props;
  switch (userType) {
    case "user":
      return <UpdateUserProfile />;
    case "admin":
      return <UpdateAdminProfile />;
    case "compagny": 
    return <UpdateCompagnyProfile />
    default:
      return null;
  }
};

export default UpdateFormControl;

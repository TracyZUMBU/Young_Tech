import React, { useEffect, useState } from "react";
import axios from "axios";
import decode from "jwt-decode";
// components
import Hero from "../components/Hero";

const getUserDetails = require("../services/services");

const Application = () => {
  //get the user's id of the compagny
  const token = localStorage.getItem("token")
  const {userID, compagny_name} = decode(token)
 
  //store all offers of the comapgny
  const [myApplications, setMyApplications] = useState([]);
  //store compagny's details
  const [myDetails, setMyDetails] = useState([]);
  useEffect(() => {
    const getMyApplications = async () => {
     
      const url = `http://localhost:4040/compagny/application/${compagny_name}`;
      const result = await axios.get(url);
      setMyApplications(result.data);
    };
    getMyApplications();

    //get user's details form "getUserDetails" function (services component)
    async function fetchData() {
      const userDetails = await getUserDetails.getUserDetails(userID);
      setMyDetails(userDetails);
    }
    fetchData();
  }, [userID, compagny_name]);


  return (
    <div className="application">
      <Hero title={"Les candidatures"} subtitle={""} />

      {myApplications.length < 1 ? (
        <div>Aucune candidature</div>
      ) : (
        // : Object.keys(groupedOffer).map((keyname, i) =>
        myApplications.map(application => (
          <>
          <div className="application-list">
            <div className="application-items">
              <p>{application.job_name}</p>
              <p>{application.first_name}</p>
              <p>{application.last_name}</p>
              <p>{application.phone}</p>
              <p>{application.cover_letter}</p>
            </div>
            <hr></hr>
          </div>;
          </>
        ))
      )}
    </div>
  );
};

export default Application;

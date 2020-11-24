import React, { useState, useEffect } from "react";
import axios from "axios";
import JobContent from "./JobContent";
import arrowDown from "../assets/logo_layout/arrow-down.svg";

const DescriptionJob = (props) => {
  const {
    idJob,
    userID,
    compagny_id,
    logo,
    wage,
    contract,
    job_name,
    compagny_name,
    location,
    toggle,
    userType,
  } = props;
  
  
  // stock details of ad
  const [furtherDetails, setFurtherDetails] = useState([]);
  const [toggleDetails, setToggleDetails] = useState(false);

  useEffect(() => {
    const getFurtherDetails = async () => {
      const url = `http://localhost:4040/allpeople/getOffer/${idJob}`;
      const result = await axios.get(url);
      setFurtherDetails(result.data);
    };
    getFurtherDetails();
  }, [idJob]);

  return (
    <>
      <div className="job-list__item">
        <div className="job-list__photo">
          <img src={logo} alt="logo de l'entreprise" />
        </div>
        <div className="job-list__contract">
          <span className="salary">{wage}€</span>
          <span className="type">{contract}</span>
        </div>
        <div className="job-list__info">
          <h6 className="name-job">{job_name}</h6>
          <ul className="compagny__info">
            <li className="compagny__name">{compagny_name}</li>
            <li className="compagny__place">{location}</li>
          </ul>
        </div>
        {!toggle ? null : (
          <div className="details-box">
            <img
              className="compagny__details"
              onClick={() => setToggleDetails(!toggleDetails)}
              src={arrowDown}
              alt={"chevron vers le bas"}
            />
          </div>
        )}
      </div>
      {toggleDetails
        ? furtherDetails.map((item) => (
            <JobContent
              key={idJob}
              idJob={idJob}
              userID={userID}
              compagny_id={compagny_id}
              description_compagny={item.description_compagny}
              description_position={item.description_position}
              prerequisite={item.prerequisite}
              userType={userType}
            />
          ))
        : null}
    </>
  );
};

export default DescriptionJob;

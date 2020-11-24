import React, { useState, useEffect } from "react";
import axios from "axios";
//components
import DescriptionJob from "./DescriptionJob";

const JobList = (props) => {
  //stock datas from DB
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const getOffers = async () => {
      const url = "http://localhost:4040/allpeople/getoffers";
      const result = await axios.get(url);
      setOffers(result.data);
    };
    getOffers();
  }, []);

  return (
    <div className="job-list">
      {offers.map((item) => (
        <DescriptionJob
          key={item.offerID}
          idJob={item.offerID}
          compagny_id={item.compagny_id}
          logo={item.logo}
          wage={item.wage}
          contract={item.contract}
          job_name={item.job_name}
          compagny_name={item.compagny_name}
          location={item.location}
          toggle={true}
          userType={null}
        />
      ))}
    </div>
  );
};

export default JobList;

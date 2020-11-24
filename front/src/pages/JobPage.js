import React, { useState, useEffect } from "react";
import axios from "axios";
import DescriptionJob from "../components/DescriptionJob";
import Hero from "../components/Hero";
import JobContent from "../components/JobContent";

const JobPage = (props) => {
  // Get params' id
  const id = props.match.params.id;
  console.log("props.match:", props);

  //stock datas for DB
  const [descriptionJob, setDescriptionJob] = useState([{}]);

  useEffect(() => {
    const getDescriptionJob = async () => {
      const url = `http://localhost:4040/users/getOffer/${id}`;
      const result = await axios.get(url);
      setDescriptionJob(result.data);
    };
    getDescriptionJob();
  }, [id]);

  const titleJob = descriptionJob.map((item) => item.job_name);

  return (
    <div className="jobPage">
      <Hero title={titleJob} />
      <div className="container">
        {descriptionJob.map((item) => (
          <DescriptionJob
            key={item.id}
            id={item.id}
            job_name={item.job_name}
            logo={item.logo}
            wage={item.wage}
            contract={item.contract}
            compagny_name={item.compagny_name}
            location={item.location}
            toggle={false}
          />
        ))}
        {descriptionJob.map((item) => (
          <JobContent
            key={item.id}
            id={item.id}
            job_name={item.job_name}
            logo={item.logo}
            wage={item.wage}
            contract={item.contract}
            compagny_name={item.compagny_name}
            location={item.location}
            description_compagny={item.description_compagny}
            description_position={item.description_position}
            prerequisite={item.prerequisite}
          />
        ))}
      </div>
    </div>
  );
};

export default JobPage;

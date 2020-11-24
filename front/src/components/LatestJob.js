import React from "react";
import JobList from "./JobList";

const LatestJob = () => {
  return (
    <section className="latestJob">
      <div className="heading-secondary">
        <h2 className="heading-secondary--main">Tous Nos Jobs</h2>
        <p className="heading-secondary--sub">Trouver le job de vos rêves.</p>
      </div>
      <JobList />
    </section>
  );
};

export default LatestJob;

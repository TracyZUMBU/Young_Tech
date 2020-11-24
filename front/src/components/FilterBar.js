import React, { useState, useEffect } from "react";
import axios from "axios";

const FilterBar = () => {
  const [getValuesFilter, setGetValuesFilter] = useState([]);

  useEffect(() => {
    const getValuesFilter = async () => {
      const url = `http://localhost:4040/allpeople/getValuesFilter`;
      const result = await axios.get(url);
      setGetValuesFilter(result.data);
    };
    getValuesFilter();
  }, []);

  // delete duplicate data from differents arrays
  const uniqueLocation = Array.from(
    new Set(getValuesFilter.map((item) => item.location))
  );
  const uniqueJob = Array.from(
    new Set(getValuesFilter.map((item) => item.job_name))
  );
  const uniqueCompagny = Array.from(
    new Set(getValuesFilter.map((item) => item.compagny_name))
  );

  return (
    <section className="filterBar">
      <div className="job-search">
        <form action="" className="job-search__form">
          <div className="job-search__filter">
            <select name="job" id="job-select">
              <option value="" selected disabled hidden>
                Métier
              </option>
              {uniqueJob.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select name="location" id="location-select">
              <option value="" selected disabled hidden>
                Lieu
              </option>
              {uniqueLocation.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select name="compagn" id="compagny-select">
              <option value="" selected disabled hidden>
                Entreprise
              </option>
              {uniqueCompagny.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <input
              className="job-search__btn btn"
              type="submit"
              value="Rechercher"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default FilterBar;

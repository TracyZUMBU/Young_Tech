import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory} from "react-router-dom"
import { Formik, Form } from "formik";
import * as Yup from "yup";
import decode from "jwt-decode";
//components
import FormikControl from "../components/formik/FormikControl";
import Button from "../components/Button";
import DescriptionJob from "../components/DescriptionJob";
import Hero from "../components/Hero";

const UpdateAd = (props) => {
  let history = useHistory()
  const offerID = props.match.params.id;
  const token = localStorage.getItem("token");
  const { userID } = decode(token);

  const [adDetails, setadDetails] = useState([]);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const getAdDetails = async () => {
      const url = `http://localhost:4040/allpeople/getOffer/${offerID}`;
      const results = await axios.get(url);
      setadDetails(results.data[0]);
    };
    getAdDetails();
  }, [response, offerID]);

   /**
   * Formik propreties
   */

    //for job_name select element
    const dropdownOptionsJob = [
        {
          key: "Choissisez un métier",
          value: "",
          selected: true,
          hidden: true,
          disabled: true,
        },
        { key: "Développeur frontend", value: "Développeur frontend" },
        { key: "Développeur backend", value: "Développeur backend" },
        { key: "Designer", value: "Designer" },
        {key: "Intégrateur web", value: "Intégrateur web"}
      ];

        const dropdownOptionsContract = [
    {
      key: "Type de contrat",
      value: "",
      selected: true,
      hidden: true,
      disabled: true,
    },
    { key: "Alternance", value: "Alternance" },
    { key: "CDI", value: "CDI" },
    { key: "CDD", value: "CDD" },
    { key: "Stage", value: "Stage" },
  ];

  const initialValues = {
    job_name: adDetails.job_name,
    description_position: adDetails.description_position,
    prerequisite: adDetails.prerequisite,
    wage: adDetails.wage,
    contract: adDetails.contract,
    location: adDetails.location,
  };

  const validationSchema = Yup.object({
    job_name: Yup.string(),
    description_position: Yup.string(),
    prerequisite: Yup.string(),
    wage: Yup.string(),
    contract: Yup.string(),
    location: Yup.string(),
  });

  const onSubmit = async (values) => {
    const url = `http://localhost:4040/compagny/updatead/${offerID}`;
    //const results = await axios.put(url, values)
    await axios({
      method: "PUT",
      url: url,
      data: values,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
    .then((res)=>{
      setResponse(res)
      if(res.status === 200){
        alert("L'offre à été modifié avec succès.")
        window.location.replace(`/compagny/${userID}`)
      }
    })
    .catch(() => {
      alert("L'offre n'a pas pu être modifiée")
      history.goBack()
    })
  };

 
  return (
    <div className="updateAd">
        <Hero title={"Modifier une offre"} subtitle={null}/>
        <DescriptionJob 
        key={offerID}
        idJob={offerID}
        logo={adDetails.logo}
        wage={adDetails.wage}
        contract={adDetails.contract}
        job_name={adDetails.job_name}
        compagny_name={adDetails.compagny_name}
        location={adDetails.location}
        />
        <div className="form-box">
      {!adDetails.location ? null : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className="updateAd-form">
                <div className="updateAd-form__inner">
             <FormikControl
                  control="select"
                  label="Métier"
                  name="job_name"
                  options={dropdownOptionsJob}
                />
               <FormikControl
                  control="textarea"
                  label="Description du poste"
                  name="description_position"
                  placeholder="Décrivez le poste"
                />
                 <FormikControl
                  control="textarea"
                  label="Pré-requis"
                  name="prerequisite"
                  placeholder="Décrivez le poste"
                />
               <FormikControl
                  control="select"
                  label="Type de contrat"
                  name="contract"
                  options={dropdownOptionsContract}
                />
             <FormikControl
                  control="input"
                  label="Salaire (par mois)"
                  name="wage"
                  placeholder="ex:1200"
                />
             <FormikControl
                  control="input"
                  label="Lieu"
                  name="location"
                  placeholder="Lieu du poste"
                />
              <Button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                  className={"btn"}
                  value={"Modifier l'offre"}
                />
                </div>
            </Form>
          )}
        </Formik>
      )}
      </div>
    </div>
  );
};

export default UpdateAd;

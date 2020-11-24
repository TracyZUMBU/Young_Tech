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
      console.log("userID:", userID);
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

  //console.log(myApplications);

  // const groupBy = (objectArray, proprety) => {
  //   return objectArray.reduce((acc, obj) => {
  //     const key = obj[proprety];

  //     if(!acc[key]) {
  //       acc[key] = []
  //     }
  //     acc[key].push(obj)
  //     return acc
  //   },{})
  // }

  // const groupedOffer = groupBy(myApplications, "job_name" )
  //  //console.log('groupedOffer:', groupedOffer)

  //  const result ={
  //   "2": [
  //     {
  //       "applicationID": 1,
  //       "first_name": "Jules",
  //       "email": "juleshubert@gmail.com",
  //       "cover_letter": "J'adore le frontent !",
  //       "phone": "0645323269",
  //       "last_name": "Hubert",
  //       "offer_id": 2,
  //       "user_id": 7,
  //       "compagny_id": 7,
  //       "offerID": 2,
  //       "job_name": "Développeur frontend",
  //       "description_position": "Pour nous accompagner au développement de Akane , nous recherchons notre développeur HTLM, CSS, JS, aux missions variées:\n\n- Participer au développement et paramétrage du site internet\n- Mise à jour des données du site internet\n- Participer à l’intégration de nouvelles fonctionnalités du site\n- Codage html\n- Aide à l’ergonomie du site\n- Veille technologique ",
  //       "prerequisite": "Vous êtes issu(e) d’une formation Bac +4 minimum dans le domaine du développement web ou l’informatique.\nVous justifiez d’une première expérience dans le développement ou création d’un site internet, réussie.\nBonne connaissance de Prestashop et Spotify\nConnaissance et pratique en HTML ,CSS,JS\nVous êtes passionné(e) par les nouvelles technologies ",
  //       "wage": "1400",
  //       "release_date": "2020-10-18T08:24:02.000Z",
  //       "contract": "Alternance",
  //       "location": "Paris",
  //       "compagny_name": "Akane"
  //     },
  //     {
  //       "applicationID": 2,
  //       "first_name": "Benoit",
  //       "email": "benoitjum@gmail.com",
  //       "cover_letter": "J'adore le front",
  //       "phone": "0645210363",
  //       "last_name": "Jum",
  //       "offer_id": 2,
  //       "user_id": 7,
  //       "compagny_id": 7,
  //       "offerID": 2,
  //       "job_name": "Développeur frontend",
  //       "description_position": "Pour nous accompagner au développement de Akane , nous recherchons notre développeur HTLM, CSS, JS, aux missions variées:\n\n- Participer au développement et paramétrage du site internet\n- Mise à jour des données du site internet\n- Participer à l’intégration de nouvelles fonctionnalités du site\n- Codage html\n- Aide à l’ergonomie du site\n- Veille technologique ",
  //       "prerequisite": "Vous êtes issu(e) d’une formation Bac +4 minimum dans le domaine du développement web ou l’informatique.\nVous justifiez d’une première expérience dans le développement ou création d’un site internet, réussie.\nBonne connaissance de Prestashop et Spotify\nConnaissance et pratique en HTML ,CSS,JS\nVous êtes passionné(e) par les nouvelles technologies ",
  //       "wage": "1400",
  //       "release_date": "2020-10-18T08:24:02.000Z",
  //       "contract": "Alternance",
  //       "location": "Paris",
  //       "compagny_name": "Akane"
  //     },
  //     {
  //       "applicationID": 12,
  //       "first_name": "Pauli",
  //       "email": "paulvaum@gmail.com",
  //       "cover_letter": "je suis trop frot",
  //       "phone": "0675689756",
  //       "last_name": "Vaumk",
  //       "offer_id": 2,
  //       "user_id": 7,
  //       "compagny_id": 7,
  //       "offerID": 2,
  //       "job_name": "Développeur frontend",
  //       "description_position": "Pour nous accompagner au développement de Akane , nous recherchons notre développeur HTLM, CSS, JS, aux missions variées:\n\n- Participer au développement et paramétrage du site internet\n- Mise à jour des données du site internet\n- Participer à l’intégration de nouvelles fonctionnalités du site\n- Codage html\n- Aide à l’ergonomie du site\n- Veille technologique ",
  //       "prerequisite": "Vous êtes issu(e) d’une formation Bac +4 minimum dans le domaine du développement web ou l’informatique.\nVous justifiez d’une première expérience dans le développement ou création d’un site internet, réussie.\nBonne connaissance de Prestashop et Spotify\nConnaissance et pratique en HTML ,CSS,JS\nVous êtes passionné(e) par les nouvelles technologies ",
  //       "wage": "1400",
  //       "release_date": "2020-10-18T08:24:02.000Z",
  //       "contract": "Alternance",
  //       "location": "Paris",
  //       "compagny_name": "Akane"
  //     }
  //   ],
  //   "4": [
  //     {
  //       "applicationID": 6,
  //       "first_name": "Jules",
  //       "email": "juleshubert@gmail.com",
  //       "cover_letter": "J'adore le frontent !",
  //       "phone": "0645323269",
  //       "last_name": "Hubert",
  //       "offer_id": 4,
  //       "user_id": 7,
  //       "compagny_id": 7,
  //       "offerID": 4,
  //       "job_name": "Développeur backend",
  //       "description_position": "Vous serez en charge de développement d’outils back-end de Qobuz sur la partie PFM (supply chain musique).\n\nMissions principales :\n\n    Spécifier, concevoir et définir les architectures des projets en accord avec le Lead Developper. Développer les projets associés.\n    Maintenir, faire évoluer et optimiser le système d’ingestion.\n    Suivre les anomalies et appliquer les actions correctives. ",
  //       "prerequisite": "Expérience professionnelle : Moins de 5 ans d’expérience en tant que développeur.\nFormations / diplômes : Bac +5 informatique / école d’ingénieur informatique ou équivalent universitaire\nPassionné(e) par le développement informatique ",
  //       "wage": "1800",
  //       "release_date": "2020-10-18T09:15:55.000Z",
  //       "contract": "CDI",
  //       "location": "Bordeaux",
  //       "compagny_name": "Akane"
  //     },
  //     {
  //       "applicationID": 8,
  //       "first_name": "Marie",
  //       "email": "mariejoy@gmail.com",
  //       "cover_letter": "Je suis la best",
  //       "phone": "0649465456",
  //       "last_name": "Joy",
  //       "offer_id": 4,
  //       "user_id": 7,
  //       "compagny_id": 7,
  //       "offerID": 4,
  //       "job_name": "Développeur backend",
  //       "description_position": "Vous serez en charge de développement d’outils back-end de Qobuz sur la partie PFM (supply chain musique).\n\nMissions principales :\n\n    Spécifier, concevoir et définir les architectures des projets en accord avec le Lead Developper. Développer les projets associés.\n    Maintenir, faire évoluer et optimiser le système d’ingestion.\n    Suivre les anomalies et appliquer les actions correctives. ",
  //       "prerequisite": "Expérience professionnelle : Moins de 5 ans d’expérience en tant que développeur.\nFormations / diplômes : Bac +5 informatique / école d’ingénieur informatique ou équivalent universitaire\nPassionné(e) par le développement informatique ",
  //       "wage": "1800",
  //       "release_date": "2020-10-18T09:15:55.000Z",
  //       "contract": "CDI",
  //       "location": "Bordeaux",
  //       "compagny_name": "Akane"
  //     }
  //   ]
  // }

  //  const insideResult = Object.keys(groupedOffer)
  // for (const [key, value] of Object.entries(result)){
  //    console.log(`${key}: ${value[i]}`);
  //    const valuee = Object.keys(value)
  //    console.log(value)

  //    console.log(`${key}:${value.map(item => item.job_name)}`);

  //    //console.log(value.find(item => item.job_name));
  //   }

  // //  .map((item => item))
  //  console.log('insideResult:', insideResult)

  return (
    <div className="application">
      <Hero title={"Les candidatures"} subtitle={""} />

      {myApplications.length < 1 ? (
        <div>Aucune candidature</div>
      ) : (
        // : Object.keys(groupedOffer).map((keyname, i) =>
        myApplications.map(application => (
          <>
              {/* <p className="job-name">{keyname}</p> */}
              {/* {console.log('keyname:', keyname)} */}
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

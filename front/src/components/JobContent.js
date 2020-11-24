import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import decode from "jwt-decode";
//components
import Button from "../components/Button";

const JobContent = (props) => {
  const {idJob, compagny_id, description_compagny, description_position, prerequisite, userType} = props

  // get user'id from localstorage
  const token = localStorage.getItem("token")
  const {userID} = decode(token)

  //handle the modal and the response from the back when deleting something
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [response, setResponse] = useState([]);

  //handle opening modale
  const handleModale = () => {
    setmodalIsOpen(true);
  };

  //close the modal and delete the offer
  const handleDeleteOffer = async () => {
    setmodalIsOpen(false);
    switch (userType) {
      case "compagny":
        const urlCompagny = `http://localhost:4040/compagny/deleteOffer/${idJob}`;
        await axios({
          method: "DELETE",
          url: urlCompagny,
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        })
          .then((res) => setResponse(res.data))
          .catch((error) => {
            console.log("error:", error);
          });
          case "admin":
            const urlAdmin = `http://localhost:4040/compagny/deleteOffer/${idJob}`;
            await axios({
              method: "DELETE",
              url: urlAdmin,
              headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
              },
            })
              .then((res) => setResponse(res.data))
              .catch((error) => {
                console.log("error:", error);
              });
      case "user":
        
        const urlUser = `http://localhost:4040/users/deleteApplication/${userID}/${idJob}`;
        axios.delete(urlUser).then((res) => setResponse(res.data));
        break;
      default:
        break;
    }
    setInterval(function() {
      window.location.reload();
    }, 300);
    //re-render force
  };

  return (
    <>
      <div className="jobPage__content">
        <div className="jobPage__description">
          <h6>Description de l'entreprise</h6>
          <p>{description_compagny}</p>
          <h6>Description du poste</h6>
          <p>{description_position}</p>
        </div>
        <div className="jobPage__prerequisite">
          <h6>Pré-requis</h6>
          <p>{prerequisite}</p>
        </div>
        <div className="side-bar">
          <div className="widget">
            <div className="inner">
              {/* element available from homepage */}
              {userType ? null : (
                <Button className={"btn btn--grey"} value={"Sauvegarder"} />
              )}
              {userType ? null : (
                <Link to={`/apply/${idJob}/${compagny_id}`} className="btn">
                  Postuler
                </Link>
              )}

              {/* element available from compagnyProfile and/or adminProfile */}
              {userType === "compagny" || userType === "admin" ? (
                <Link
                  to={{
                    pathname: `/updatead/${idJob}`,
                    state: { compagny_id: true }
                  }}
                  className="btn btn--grey"
                >
                  Editer
                </Link>
              ) : null}
              {userType === "compagny" || userType === "admin" ? (
                <Button
                  action={handleModale}
                  value={"Supprimer"}
                  className="btn"
                />
              ) : null}

              {/* element available for user only */}
              {userType === "user"  ? (
                <Button
                  value={"Retirer sa candidature"}
                  className="btn"
                  action={handleModale}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setmodalIsOpen(false)}
        shouldCloseOnOverLayClick={false}
      >
        <div>
          <h2>confirmer la suppression ?</h2>
          <button onClick={() => handleDeleteOffer()}>Oui</button>
        </div>
      </Modal>
    </>
  );
};

export default JobContent;

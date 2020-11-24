import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
// components
import Category from "../components/Category";
import DescriptionJob from "../components/DescriptionJob";
import Hero from "../components/Hero";
import UpdateAdminProfile from "../components/UpdateProfileForm/UpdateAdminProfile";
import DeleteAccount from "../components/DeleteAccount";

import { getUserDetails } from "../services/services";
import decode from "jwt-decode";
Modal.setAppElement("#root");

const AdminProfile = () => {
  //get the user's id form localstorage
  const token = localStorage.getItem("token");
  const { userID } = decode(token);

  //get the list of :
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [compagnies, setCompagnies] = useState([]);
  const [myDetails, setMyDetails] = useState([]);

  //handle modal opening
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  //get what user's type and user's id to delete
  const [userToDelete, setUserToDelete] = useState("");

  //stock results from back
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const url = "http://localhost:4040/admin/users";
      const result = await axios.get(url);
      setUsers(result.data);
    };
    getUsers();

    const getOffers = async () => {
      const url = "http://localhost:4040/allpeople/getoffers";
      const result = await axios.get(url);
      setOffers(result.data);
    };
    getOffers();

    const getCompagnies = async () => {
      const url = "http://localhost:4040/admin/compagnies";
      const result = await axios.get(url);
      setCompagnies(result.data);
    };
    getCompagnies();

    //get user's details form "getUserDetails" function (services component)
    async function fetchData() {
      const userDetails = await getUserDetails();
      setMyDetails(userDetails);
    }
    fetchData();
  }, [response]);

  //admin's logo
  const logo = myDetails.logo;

  // handle opening modal
  const handleModale = (userID) => {
    setUserToDelete(userID);
    setmodalIsOpen(true);
  };

  // handle deletation of user/compagny depending on is type
  const handleDelete = async () => {
    setmodalIsOpen(false);
    const url = `http://localhost:4040/allpeople/deleteUserAccount/${userToDelete}`;
    await axios({
      method: "DELETE",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => setResponse(res.data))
      .catch((error) => {
        console.log("error:", error);
      });
  };

  return (
    <>
      <Hero logo={logo} nameUser={"Yo les admins"} />
      <div className="container">
        <div className="inner--profilePage">
          <div className="user">
            <Category name={"Les utilisateurs"} />
            <div className="list">
              {users.map((user) => (
                <div key={user.userID} className="list__user">
                  <p>
                    {user.first_name} {user.last_name}
                  </p>
                  <span
                    onClick={() => handleModale(user.userID)}
                    role="img"
                    aria-label={"supprimer"}
                  >
                    &#x274C;
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="ad">
            <Category name={"Les compagnies"} />
            <div className="list list--show">
              {compagnies.map((compagny) => (
                <ul key={compagny.compagnyID} className="list__compagny">
                  <li>{compagny.compagny_name}</li>
                  <span
                    role="img"
                    aria-label={"supprimer"}
                    onClick={() => handleModale(compagny.compagnyID)}
                  >
                    &#x274C;
                  </span>
                </ul>
              ))}
            </div>
          </div>

          <div className="compagny">
            <Category name={"Les offers"} />
            <div className="list list--show">
              {offers.map((offer) => (
                <DescriptionJob
                  key={offer.offerID}
                  idJob={offer.offerID}
                  logo={offer.logo}
                  wage={offer.wage}
                  contract={offer.contract}
                  job_name={offer.job_name}
                  compagny_name={offer.compagny_name}
                  location={offer.location}
                  toggle={true}
                  userType={"admin"}
                />
              ))}
            </div>
          </div>

          <div className="mydetails">
            <Category name={"Mon profil"} />
            <UpdateAdminProfile userDetails={myDetails} />
          </div>
          <DeleteAccount />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setmodalIsOpen(false)}
            shouldCloseOnOverLayClick={false}
          >
            <div>
              <h2>confirmer la suppression ?</h2>
              <button onClick={() => handleDelete()}>Oui</button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;

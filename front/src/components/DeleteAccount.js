import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import decode from "jwt-decode";
//components
import Button from "./Button";

Modal.setAppElement("#root");

const DeleteAccount = () => {
  let history = useHistory();

  //get the user's id form localstorage
  const token = localStorage.getItem("token");
  const { userID } = decode(token);

  //handle modal opening
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  //handle modal opening
  const handleModale = () => {
    setmodalIsOpen(true);
  };

  //delete the account of the user
  const deleteAccount = async () => {
    setmodalIsOpen(false);
    const url = `http://localhost:4040/allpeople/deleteUserAccount/${userID}`;
    await axios({
      method: "DELETE",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then(() => {
        alert("votre compte à été supprimé");
        localStorage.clear();
        window.location.replace("/");
      })
      .catch(() => {
        alert("votre compte n'a pas pu être supprimé");
      });
  };

  return (
    <>
      <div className="othersOptions">
        <Button
          action={() => handleModale()}
          className={"btn btn--round btn--grey"}
          value={"supprimer mon compte"}
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setmodalIsOpen(false)}
        shouldCloseOnOverLayClick={false}
      >
        <div>
          <h2>confirmer la suppression ?</h2>
          <button onClick={() => deleteAccount()}>Oui</button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteAccount;

const connection = require("../../config");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { isLogged, isAdmin } = require("../../controllers/auth")


//getOffers pour fichier allPeople (works)
router.get("/getoffers", (req, res) => {
  connection.query(
    `SELECT * FROM Job.offers
      INNER JOIN Job.compagnies
      ON compagnies.compagny_name = offers.compagny_name
      INNER JOIN Job.users
      ON users.userID = offers.user_id
      `,
    (err, results) => {
      if (err) {
        console.log("error: ", err);
        res.status(500).send("Error retrieving offers");
      } else res.status(200).json(results);
    }
  );
});

//getValuesFilter pour le fichier (works)

router.get("/getValuesFilter", (req, res) => {
  connection.query(
    `SELECT DISTINCT offers.job_name, compagnies.compagny_name, offers.location FROM Job.offers
    INNER JOIN Job.compagnies
    ON compagnies.compagnyID = offers.compagny_id`,
    (err, results) => {
      if (err) {
        console.log("error: ", err);
        res.status(500).send("Error retrieving datas");
      } else res.status(200).json(results);
    }
  );
});

// Delete an account (works)
router.delete("/deleteUserAccount/:id", isLogged, (req, res) => {
  const userID = req.params.id;
  console.log(userID);
  connection.query(
    `DELETE FROM Job.users WHERE users.userID = "${userID}"`,
    (err, results) => {
      if (err) {
        console.log("err:  hello", err);
        res.status(500).send("This user have not been deleted");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// get detail's offer (works)
router.get("/getOffer/:idJob", (req, res) => {
  const offerID = req.params.idJob;
  console.log('offerID:', offerID)
  connection.query(
    `SELECT * FROM Job.offers
      INNER JOIN Job.compagnies
      ON compagnies.compagnyID = offers.compagny_id
      INNER JOIN Job.users
      ON users.userID = offers.user_id
          WHERE offers.offerID = ${offerID} `,
    (err, resultat) => {
      if (err) {
        console.log(err);
        res.status(500).send("Can't get my offers");
      } else {
        res.status(200).json(resultat);
      }
    }
  );
});

//all user get his details (works)
router.get("/userDetails/:userID", isLogged, (req, res) => {
  const userID = req.params.userID;
  connection.query(
    `SELECT * FROM Job.users WHERE userID = ${userID} 
     `,
    (err, results) => {
      if (err) {
        console.log("error: ", err);
        res.status(500).send("Error retrieving offers");
      } else res.status(200).json(results);
    }
  );
});

////////////////////////////////// UPDATE

// all users can update his info (works)
router.put("/updateProfile/:userID", (req, res) => {
  const userID = req.params.userID;
  if(req.body.password){
    req.body.password = bcrypt.hash(req.body.password, 10)
  }
  const newDetails = req.body 
  connection.query(
    "UPDATE Job.users SET ? WHERE users.userID = ? ",
    [newDetails , userID],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

module.exports = router;

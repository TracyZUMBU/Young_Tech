const connection = require("../../config");
const express = require("express");
const router = express.Router();

//middleware
const { isCompagny } = require("../../controllers/auth")


//Get all offer by compagny (works)
router.get("/getMyOffers/:id", (req, res) => {
  const userID = req.params.id;
  connection.query(
    `SELECT * FROM Job.offers
      INNER JOIN Job.compagnies
      ON compagnies.compagny_name = offers.compagny_name
      INNER JOIN Job.users
      ON users.userID = offers.user_id
          WHERE offers.user_id = ${userID} `,
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

//Compagny can post offers (works)
router.post("/createad", (req, res) => {
  const content = req.body;
  console.log(content);
  connection.query(
    `INSERT INTO Job.offers (job_name, description_position, prerequisite, location, wage, contract, compagny_id, user_id, compagny_name) VALUES ("${content.job_name}", "${content.description_position}", "${content.prerequisite}", "${content.location}", "${content.wage}", "${content.contract}", "${content.userID}", "${content.userID}", "${content.compagny_name}")`,
    (err, resultat) => {
      if (err) {
        console.log(err);
        res.status(500).send("the Compagny Can't post an offers");
      } else {
        res.status(200).json(resultat);
      }
    }
  );
});

//Compagnies get offer applications (works)
router.get("/offerApplication", (req, res) => {
  const userID = req.body.userID;
  connection.query(
    `SELECT * FROM Job.application WHERE user_id= "${userID}" `,
    (err, results) => {
      if (err) {
        console.log("err: ", err);
        res.status(500).send("The compagny didn\t find the application");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// get application of their offers (wors)
router.get("/application/:compagny_name", (req, res) => {
  const compagny_name = req.params.compagny_name
  connection.query(`SELECT * FROM Job.application INNER JOIN Job.offers ON application.offer_id = offers.offerID WHERE offers.compagny_name = "${compagny_name}" `,
  (err, results) => {
    if (err) { 
      console.log("err: ", err);
      res.status(500).send("The compagny didn\t find the application");
    } else {
      res.status(200).json(results);
    }
  }
  )
})

// Compagny can update their offers
router.put("/compagnyUpdateOffer", (req, res) => {
  const details = req.body;
  console.log(details);
  connection.query(
    `UPDATE offers SET job_name="${details.job_name}" description_position="${details.description_post}",prerequisite="${details.prerequisite}",wage="${details.wage}",contract="${details.contract}",location="${details.location}" WHERE  offers.compagnyID ="${details.compagnyID}  AND WHERE offers.userID = "${details.userID}"`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("The offer has not been updated");
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//Compagny can delete offers (works)
router.delete("/deleteOffer/:id",isCompagny, (req, res) => {
  console.log("I'm insite delete route : deleteOffer");
  const offerID = req.params.id;
  connection.query(
    `DELETE FROM Job.offers WHERE offerID = "${offerID}"`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("This compagny has not delete this offer");
      } else {
        console.log("inside else");
        res.status(200).json(results);
      }
    }
  );
});


//update a offer
router.put("/updatead/:offerID", (req,res) => {
  const offerID = req.params.offerID
  const newDetails = req.body

  connection.query( "UPDATE Job.offers SET ? WHERE offers.offerID = ?", [newDetails, offerID], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send("Profile updated");
    }
  })
})

module.exports = router;

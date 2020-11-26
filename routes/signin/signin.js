//modules
const connection = require("../../config");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

//middleware
const { validateRegister} = require("../../controllers/auth");

//privateKey of token
const secret = process.env.JWT_SECRET;

app.use(
  expressJwt({
    secret: secret,
    algorithms: ["RS256"],
  }).unless({ path: ["/register"] })
);

//function to build token with user's detail get from requests
const buildToken = (results, res) => {
  const {
    userID,
    type,
    email,
    first_name,
    last_name,
    phone,
    description_compagny,
    logo,
    compagnyID,
    compagny_name
  } = results[0];
  
  // build token
  const token = jwt.sign(
    {
      userID,
      email,
      first_name,
      last_name,
      phone,
      description_compagny,
      compagnyID,
      logo,
      userType: type,
      compagny_name:compagny_name
    },
    secret,
    {
      expiresIn: "24h",
    },
    { algorithm: "RS256" }
  );

   //send token to the client
   res.header("Access-Control-Expose-Headers", "x-access-token");
   res.set("x-access-token", token);
   res.status(200).send({ authUser: true, userID, userType: type });
} 

// route to sign in
router.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Route to signin
  connection.query(
    `SELECT * FROM Job.users
    LEFT JOIN Job.compagnies
    ON compagnies.compagny_name = users.compagny_name WHERE  email = "${email}" `,
    (err, results) => {
      if (err) {
        console.log("Error when selecting user's details ", + err);
      } else if (!results[0]) {
        console.log("user not found");
        return res.status(409).send({ msg: "your details is incorrect" });
      }
      
      const passwordIsValid = bcrypt.compareSync(password, results[0].password);
      if (!passwordIsValid) {
        console.log("password incorrect");
        return res.status(409).send({ msg: "your details is incorrect" });
      }

      // Build token
      buildToken(results,res)
    }
  );
});

// route to sign up
router.post("/register", validateRegister, async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    logo,
    compagny_name,
    phone,
    description_compagny,
    userType,
  } = req.body;
  // hashing password
  const password = await bcrypt.hash(req.body.password, 10);

  //request for compagny
  if (compagny_name) {
    connection.query(
      `INSERT INTO Job.users(first_name, last_name,password,email, logo, type, compagny_name, phone, description_compagny) VALUES ("${first_name}", "${last_name}", "${password}","${email}","${logo}", "${userType}", "${compagny_name}", "${phone}", "${description_compagny}")`,
      (err, results) => {
        if (err) {
          console.log("error when inserting new user: ", err);
          res.status(500).send("user has not been registered");
        } else {
          console.log("user has been register");
        }
      }
    );
    connection.query(
      `INSERT INTO Job.compagnies SELECT users.userID, users.compagny_name, users.userID FROM Job.users WHERE userID = LAST_INSERT_ID()`
    );
  }

  //request for others users
  else {
    connection.query(
      `INSERT INTO Job.users(first_name, last_name,password,email, logo, type, phone) VALUES ("${first_name}", "${last_name}", "${password}","${email}","${logo}", "${userType}", "${phone}")`,
      (err, results) => {
        if (err) {
          console.log("err :", err);
        } else {
          console.log("user has been register");
        }
      }
    );
  }

  //Get user's details which have been registered and send it to the front
  connection.query(
    `SELECT * FROM Job.users WHERE email = "${email}"`,
    (err, results) => {
      if (err) {
        console.log("err :", err);
      } else {
        buildToken(results, res)
      }
    }
  );
});

module.exports = router;

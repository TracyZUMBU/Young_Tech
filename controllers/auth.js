const connection = require("../config");
const jwt = require("jsonwebtoken");

module.exports = {
  validateRegister: (req, res, next) => {
    const { email, password, repeat_password } = req.body;
  
    connection.query(
      "SELECT email FROM Job.users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.log(
            "Error when checking if user's email is already in use" + err.message
          );
        }
  
        if (result.length > 0) {
          return res.status(400).send({
            msg: "Email already in use",
          });
        } else if (password !== repeat_password) {
          return res.status(400).send({
            msg: "Both passwords do not match",
          });
        }
        //req.hashedPassword = await bcrypt.hash(password, 10);
        next();
      }
    );
  },
  isLogged: (req,res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(401).send("Access Denied");
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      console.log("verified:", verified);
    } catch (err) {
      console.log("error token", err);
      return res.status(400).send("Invalid Token");
    }
    next();

  },
  isAdmin: (req,res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(401).send("You're not a admin");
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      if (verified.userType !== "user") {
        console.log("hh");
        return false
      }
      console.log("verified:", verified);
    } catch (err) {
      console.log("error token", err);
      return res.status(400).send("Invalid Token");
    }
    next();

  }
}
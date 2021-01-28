const express = require ('express');
const app = express();
const router = require ('./routes/index')
const bodyParser = require ('body-parser')
const cors = require('cors')
const morgan = require('morgan')
//const expressJwt = require("express-jwt");

const port = process.env.PORT || 4040
//const secret = process.env.JWT_SECRET;
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// app.use(
//     expressJwt({
//       secret: secret,
//       algorithms: ["RS256"],
//     }).unless({ path: ["/allpeople"] })
//   );
  

//MIDDLEWARE 
app.use('/users', router.users)
app.use('/admin', router.admin)
app.use('/compagny', router.compagny)
app.use('/allpeople', router.allPeople)
app.use('/signin', router.signin)


app.listen(port, () => {
    console.log (`listening on port ${port}`)
})






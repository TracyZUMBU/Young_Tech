const connection = require('../../config')
const express = require('express')
const router = express.Router() 

const { isUser } = require("../../controllers/auth")

//  get applied offers (works)
router.get('/offerApplied/:userID', (req, res) => { 
  const userID = req.params.userID
  connection.query(`SELECT *, application.first_name AS name  FROM Job.offers
  INNER JOIN Job.compagnies
  ON compagnies.compagnyID = offers.compagny_id
  INNER JOIN Job.users
  ON users.userID = offers.user_id
  INNER JOIN Job.application
  ON application.offer_id = offers.offerID
  WHERE application.user_id = ${userID}
  `, (err,results) => {
      if (err) {
          console.log('error: ', err);
          res.status(500).send('Error retrieving offers')
      }else res.status(200).json(results)
  })
}) 
 



// // user can post their application (works)
router.post('/postApplication', (req, res)=>{
  
  const content = req.body
    if(!content.user_id){
      content.user_id = null
    }
 connection.query(`INSERT INTO Job.application(first_name, email, cover_letter, phone, last_name,offer_id, user_id, compagny_id) VALUES ("${content.first_name}", "${content.email}", "${content.cover_letter}","${content.phone}", "${content.last_name}", "${content.offer_id}", "${content.user_id}", "${content.compagny_id}") `,(err, results)=>{
   if(err){
     console.log('err : ' ,err)
     res.status(500).send('The application have not been posted')
   }else{
     res.status(200).json(results)
   }
 })
})
 
//delete application (works)
router.delete("/deleteApplication/:userID/:offerID",isUser, (req,res) => {
  const userID = req.params.userID;
  const offerID = req.params.offerID
  connection.query(`DELETE FROM Job.application WHERE user_id = ${userID} AND offer_id = ${offerID}`)
})

module.exports = router 
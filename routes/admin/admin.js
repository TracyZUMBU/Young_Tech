const connection = require('../../config')
const express = require('express')
const router = express.Router()



//   USERS


//Admin can get all users (works)
router.get("/users", (req, res) => {
    connection.query(
      'SELECT * FROM Job.users WHERE users.type = "user" OR users.type = "admin"',
      (err, results) => {
        if (err) {
          res.status(500).send("Don't find all users");
        } else {
          res.send(results);
        }
      }
    );
  });

// Admin can get all compagny
router.get("/compagnies", (req, res) => {
    connection.query("SELECT * FROM Job.compagnies ", (err, results) => {
      if (err) {
        res.status(500).send("Don't find all compagnies");
      } else {
        res.send(results);
      }
    });
  });


//Admin can delete an user (checked)
router.delete('/userDelete/:id', (req, res) => {
    const userID = req.params.id
    connection.query(`DELETE FROM Job.users WHERE userID = "${userID}"`, (err, results) => {
        if (err) {
            console.log('error: ', err)
            res.status(500).send('This user have not been deleted')

        } else {
            res.status(200).json(results)
        }
    })
})

//OFFERS


//Admin can delete an offer (checked)
router.delete('/offerDelete/:id',(req, res)=>{
    const offerID = req.params.id
 connection.query(`DELETE FROM Job.offers WHERE offerID = "${offerID}"`,(err, results)=>{
     if(err){
         console.log('error: ', err)
         res.status(500).send('This offer has not been deleted')
     }else{
        res.status(200).json(results)
     }
  })
})


//      COMPAGNIES


// Admin can delete a compagny (checked)
router.delete('/compagnyDelete/:id', (req, res) => {
    const compagnyID = req.params.id
    connection.query(`DELETE FROM Job.compagnies WHERE compagnyID = "${compagnyID}"`,(err , results) => {
        if (err) {
            console.log('error: ', err)
            res.status(500).send('This compagny have not been deleted')
        } else {

            res.status(200).json(results)
        }
    })
})



module.exports = router
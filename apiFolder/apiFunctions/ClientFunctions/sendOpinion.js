const FbApp = require('../Firebase');
let admin = require('firebase-admin');
const auth = FbApp.auth();
const db = FbApp.firestore();

function sendOpinion(req, res){
    let idSc = req.body.id;
    let opinionSc = req.body.opinion;
    let rankingSc = req.body.ranking;

    auth.onAuthStateChanged((user)=>{
        if(user){
             
            db.collection('scientists').doc(idSc).update({
                rankings: admin.firestore.FieldValue.arrayUnion({
                    Opinion: opinionSc,
                    email: user.email,
                    id: user.uid,
                    name: user.displayName,
                    ranking: rankingSc
                })
            }).catch(err => console.log(err))
        }
        //Else if user.admin añadir html para admin 
      })

      res.send({announce: 'all good'});
}


module.exports = sendOpinion;

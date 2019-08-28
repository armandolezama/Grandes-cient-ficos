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
            let rankings = [];
            db.collection('scientists').doc(idSc).get().then(doc =>{
                let newOpinion = {
                    Opinion: opinionSc,
                    email: user.email,
                    id: user.uid,
                    name: user.displayName,
                    ranking: rankingSc
                };
                console.log(doc.data().rankings)
                rankings = doc.data().rankings;
                rankings.push(newOpinion)
                db.collection('scientists').doc(idSc).set({rankings}, {merge: true}).catch(err => console.log(err))
            })
            
        }
        //Else if user.admin añadir html para admin 
      })

      res.send({announce: 'all good'});
}


module.exports = sendOpinion;

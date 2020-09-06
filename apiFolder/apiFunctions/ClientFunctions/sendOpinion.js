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
            // let newOpinion = {
            //     Opinion: opinionSc,
            //     email: user.email,
            //     id: user.uid,
            //     name: user.displayName,
            //     ranking: rankingSc
            // };
            // db.collection('scientists').doc(idSc).update({
            //     rankings: admin.firestore.FieldValue.arrayUnion(newOpinion)
            // })

            db.collection('scientists').doc(idSc).get().then(doc =>{
                let newOpinion = {
                    Opinion: opinionSc,
                    email: user.email,
                    id: user.uid,
                    name: user.displayName,
                    ranking: rankingSc
                };
                
                rankings = doc.data().rankings;
                rankings.push(newOpinion)
                db.collection('scientists').doc(idSc).set({rankings}
                    , {merge: true}).catch(err => console.log(err)) 
                res.send(
                    { announce: 'all good',
                      html: `
                      <div class="rankin">
                      <h4 id="${newOpinion.id}" class="user-name">${newOpinion.name}</h4>
                      <p class="ranking">${newOpinion.ranking}</p>
                      <p>${newOpinion.Opinion}</p>
                      </div>`
                    });
            })
            
        }
        //Else if user.admin añadir html para admin 
      })
}


module.exports = sendOpinion;

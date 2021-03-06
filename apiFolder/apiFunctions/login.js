const FbApp = require('./Firebase');
const auth = FbApp.auth();
const processingData = require('./ClientFunctions/processingData')
const db = FbApp.firestore();

function login(req, resp){ 
  const email = req.body.email;
  const password = req.body.password;
  let html = '';
  let errorCreate = '';
  let errorAuth = '';
  body = {html, errorCreate, errorAuth}

  auth.signInWithEmailAndPassword(email, password).catch(err => {
    console.log(err)
  });

    auth.onAuthStateChanged((user)=>{
        if(user){
          db.collection('scientists').get().then(snapshot =>{
          body.html = processingData(user, snapshot);
          resp.send(body);
        }).catch(err => {
          console.log(err)
          resp.send(err)
          })
        } 

        //Else if user.admin añadir html para admin 
      })
}

module.exports = login;
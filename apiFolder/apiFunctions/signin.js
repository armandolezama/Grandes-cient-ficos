const FbApp = require('./Firebase');
const auth = FbApp.auth();
const processingData = require('./ClientFunctions/processingData')
const db = FbApp.firestore();

function signin(req, resp){
  const name = req.body.name;    
  const email = req.body.email;
  const password = req.body.password;
  let html = '';
  let errorCreate = '';
  let errorAuth = '';
  body = {html, errorCreate, errorAuth}

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        var dbUser = db.collection('users')
        dbUser.doc(cred.user.uid).set({    
          email: email,
          name: name
          });
      }).catch((err) => {
        console.log(err)
        body.errorCreate = err;
      });

    auth.onAuthStateChanged((user)=>{
        if(user){
          auth.currentUser.updateProfile({
            displayName: name
          }).catch(function(error) {
            console.log(error)
          });
          console.log('auth aceptada')
          db.collection('scientists').get().then(snapshot =>{
            body.html = processingData(user, snapshot);
            resp.send(body);
          }).catch(err => console.log(err))
        } 
      })
}

module.exports = signin;
const FbApp = require('./Firebase')
const auth = FbApp.auth();
const db = FbApp.firestore();

function signin(req, resp){

    

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred)
        var dbUser = db.collection('users')
        dbUser.doc(cred.user.uid).set({    
          email: email,
          name: name
          });
        sginupTags.signupForm.reset();
        console.log('started sesion')
        // Cerrar modal
      });
}

module.exports = signin;
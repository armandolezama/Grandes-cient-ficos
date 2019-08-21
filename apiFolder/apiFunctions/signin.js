const FbApp = require('./Firebase')
const auth = FbApp.auth();
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
        console.log(cred)
        var dbUser = db.collection('users')
        dbUser.doc(cred.user.uid).set({    
          email: email,
          name: name
          });
        sginupTags.signupForm.reset();
        // Cerrar modal
      }).catch((err) => {
        body.errorCreate = err;
      });

      auth.onAuthStateChanged((user)=>{
        if(user){
          db.collection('scientists').get().then(function(querySnapshot){
              querySnapshot.forEach((doc) => {
                let opinions = '';
                doc.ranking.forEach((rank) => {
                  opinions += `
                  <div class="rankin">
                  <h4 id="${rank.uid}" class="user-name" >${rank.name}</h4>
                  <p class="ranking" >${rank.ranking}</p>
                  </div>
                  `
                })
                body.html += `
                <article id=" /* id form scientist document* / " class="scientist-card" >
                <h3 class="scientist-name">${doc.name} </h3>
                <p class="contribution">${doc.contributions} </p>
                ${opinions}
                </article>
                ` 
                  // doc.data() is never undefined for query doc snapshots
                  // console.log(doc.id, " => ", doc.data());
              });
          })
          .catch((error) => {
              body.errorAuth = error;
          });

          body.html += `
          <section id="public-container" class="public-container">
          ${body.html}
          </section>
          `;
          
        } 
      })

  resp.send(body)
}

module.exports = signin;
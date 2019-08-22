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
        console.log('auth activada')
        if(user){
          console.log('auth aceptada')
          db.collection('scientists').get().then(snapshot =>{
              snapshot.forEach(doc => {
                let opinions = '';
                for(rank of doc.data().rankings){

                    opinions += `
                    <div class="rankin">
                    <h4 id="${rank.id}" class="user-name" >${rank.name}</h4>
                    <p class="ranking" >${rank.ranking}</p>
                    <p>${rank.Opinion}</p>
                    </div>
                    `
                  }

                body.html += `
                <article id=" /* id form scientist document* / " class="scientist-card" >
                <h3 class="scientist-name">${doc.data().name} </h3>
                <p class="contribution">${doc.data().contributions} </p>
                ${opinions}
                </article>
                ` 
                  // doc.data() is never undefined for query doc snapshots
                  // console.log(doc.id, " => ", doc.data());
              });
              body.html = `
              <section id="public-container" class="public-container">
              ${body.html}
              </section>
              `;
              resp.send(body)
          }).catch(err => console.log(err))
        } 
      })
}

module.exports = signin;
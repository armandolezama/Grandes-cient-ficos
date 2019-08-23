const FbApp = require('./Firebase')
const auth = FbApp.auth();
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

                opinions = `
                <div class="rank-section" >
                ${opinions}
                </div>
                <input class="new-opinion" type="text">
                <button id="send-opinion" class="send-opinion">Enviar opinion</button>
                `
  
                body.html += `
                <article id="${doc.id}" class="scientist-card" >
                <h3 class="scientist-name">${doc.data().name} </h3>
                <p class="contribution">${doc.data().contributions} </p>
                ${opinions}
                </article>
                ` 
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
            })   ;
              body.html = `
              <article class="user-data" >
              <h2>${user.displayName}</h2>
              </article>
              <section id="public-container" class="public-container">
              ${body.html}
              </section>
              `;
              resp.send(body)
          }).catch(err => console.log(err))
        } 

        //Else if user.admin añadir html para admin 
      })
}

module.exports = login;
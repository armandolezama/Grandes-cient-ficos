module.exports = function processingData(user, snapshot) {
  let html = '';
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

      html += `
      <article id="${doc.id}" class="scientist-card" >
      <h3 class="scientist-name">${doc.data().name} </h3>
      <p class="contribution">${doc.data().contributions} </p>
      ${opinions}
      </article>
      ` 
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
  })   ;
    html = `
    <article class="user-data" >
    <h2 class="user-loged">Nombre de usuario: ${user.displayName}</h2>
    <p>Correo electrónico: ${user.email}</p>
    </article>
    <section id="public-container" class="public-container">
    ${html}
    </section>
    `;
    return html;
}



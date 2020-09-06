module.exports = function processingData(user, snapshot) {
  let html = '';
    snapshot.forEach(doc => {
      let opinions = '';
      if(doc.data().rankings.length > 0){
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
        <div id="rank-section-of-${doc.id}" class="rank-section" >
        ${opinions}
        </div>
        <input id="input-of-${doc.id}" class="new-opinion" type="text">
        <div class="rank-score">
          <h4>Puntaje: </h4> <p id="score-of-${doc.id}", class="score">5</p>
          <button id="score-plus-of-${doc.id}" class="score-plus">+</button>
          <button id="score-less-of-${doc.id}" class="score-les">-</button>
        </div>
        <button name="${doc.id}" class="send-opinion">Enviar opinion</button>
        `
      } else {
        opinions = `
        <div id="rank-section-of-${doc.id}" class="rank-section" >
        </div>
        <input id="input-of-${doc.id}" class="new-opinion" type="text" required>
        <button name="${doc.id}" class="send-opinion">Enviar opinion</button>
        `
      }

      html += `
      <article id="card-of-${doc.data().name}" class="scientist-card" >
      <h3 class="scientist-name">${doc.data().name}</h3>
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
    <button class="end-session" onclick="logout()" >Salir</button>
    </article>
    <section id="public-container" class="public-container">
    ${html}
    </section>
    `;
    return html;
}



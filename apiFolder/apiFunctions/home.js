const FbApp = require('./Firebase')
const auth = FbApp.auth();

let homeNec = true;

// auth.onAuthStateChanged(user => {
//   if (!user) {
//     homeNec = false;
//   } 
// })


function home(req, res){
   auth.onAuthStateChanged((user)=>{
     if(user){
       homeNec = false;
     }
   })
    let html = `
    <div class="login-page">
    <div class="form">
      <form class="register-form">
        <input type="text" placeholder="name"/>
        <input type="password" placeholder="password"/>
        <input type="text" placeholder="email address"/>
        <button>create</button>
        <p class="message">¿Ya te registraste? <a href="#">Entra a tu cuenta</a></p>
      </form>
      <form class="login-form">
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>
        <button>login</button>
        <p class="message">¿No te has registrado? <a href="#">Crea tu cuenta</a></p>
      </form>
    </div>
    </div>`
    
    body = {
        html:html,
        homeNec : homeNec
    }
    res.send(body);
}

module.exports = home;

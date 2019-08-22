const FbApp = require('./Firebase')
const auth = FbApp.auth();

let homeNec = true;


function home(req, res){
   auth.onAuthStateChanged((user)=>{
     if(user){
       homeNec = false;
     }
   })
    let html = `
    <div class="login-page">
    <div class="form">
      <form id="signin-form" class="register-form">
        <input id="sign-name" name="name" type="text" placeholder="Nombre"/>
        <input id="sign-password" name="password" type="password" placeholder="Contraseña"/>
        <input id="email" name="email" type="text" placeholder="Correo electrónico"/>
        <input type="submit" value="Crear cuenta">
        </form>
        <p class="message">¿Ya te registraste? <a href="#">Inicia sesión</a></p>
      <form id="login-form" class="login-form">
        <input id="log-name" name="name" type="text" placeholder="username"/>
        <input id="log-password" name="password" type="password" placeholder="password"/>
        <input type="submit" value="Iniciar sesión">
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

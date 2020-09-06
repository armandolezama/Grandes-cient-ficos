const FbApp = require('./Firebase')
const auth = FbApp.auth();


function home(req, res){

    let html = `
    <div class="login-page">
    <div class="form">
      <form id="signin-form" class="register-form" >
        <input id="sign-name" name="name" type="text" placeholder="Nombre" required>
        <input id="email" name="email" type="text" placeholder="Correo electrónico" required>
        <input id="sign-password" name="password" type="password" placeholder="Contraseña" required>
        <input type="submit" value="Crear cuenta">
        </form>
        <p class="message">¿Ya te registraste? <a href="#">Inicia sesión</a></p>
      <form id="login-form" class="login-form">
        <input id="log-email" name="email" type="email" placeholder="Correo electrónico" required>
        <input id="log-password" name="password" type="password" placeholder="Contraseña" required>
        <input type="submit" value="Iniciar sesión">
        <p class="message">¿No te has registrado? <a href="#">Crea tu cuenta</a></p>
      </form>
    </div>
    </div>`
    
    body = {
        html:html
    } // 
    res.send(body);
}

module.exports = home;

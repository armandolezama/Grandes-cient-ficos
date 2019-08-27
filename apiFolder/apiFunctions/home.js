const FbApp = require('./Firebase')
const auth = FbApp.auth();
const db = FbApp.firestore();
const processingData = require('./processingData')
let homeNec = true;
let html = ''


function home(req, res){
   auth.onAuthStateChanged((user)=>{
     if(user){
       homeNec = false;
        console.log('auth aceptada')
        db.collection('scientists').get().then(snapshot =>{
        body.html = processingData(user, snapshot);
        body = {
          html:html,
          homeNec : homeNec
      }
        res.send(body);
        res.end();
      }).catch(err => {console.log(err)})
     } else {    
       let html = `
     <div class="login-page">
     <div class="form">
       <form id="signin-form" class="register-form">
         <input id="sign-name" name="name" type="text" placeholder="Nombre"/>
         <input id="email" name="email" type="text" placeholder="Correo electrónico"/>
         <input id="sign-password" name="password" type="password" placeholder="Contraseña"/>
         <input type="submit" value="Crear cuenta">
         </form>
         <p class="message">¿Ya te registraste? <a href="#">Inicia sesión</a></p>
       <form id="login-form" class="login-form">
         <input id="log-email" name="email" type="email" placeholder="Correo electrónico"/>
         <input id="log-password" name="password" type="password" placeholder="Contraseña"/>
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
     res.end();
     }
   })

}

module.exports = home;

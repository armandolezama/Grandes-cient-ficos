const mainSection = document.querySelector('.content-window')
const form = document.querySelector('form')

let url = 'http://localhost:8000/grandes-cientificos'
// let home = {
//     method: 'get'
// };

function start(){
    
    fetch(`${url}/home`).then(
        response => response.text()).then(
            (response) => mainSection.innerHTML = response
    ).catch(err => console.log(err));
}

/*Función que se dividirá entre el addeventlistener (front) y el auth (back) */

loginTags.loginForm.addEventListener('submit', (event)=> {
    event.preventDefault();

    const email = loginTags.loginForm.email.value;
    const password = loginTags.loginForm.password.value;

    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // close the signup modal & reset form
        modalScreens.publicContainer.style.display = 'flex'
        modalScreens.succes.style.display = 'flex';
        loginTags.loginForm.reset();
      }).catch(err => {
        alert('El usuario y contraseña son incorrectos o no existen');
        restartModal();
        console.log('err')
      });

});


sginupTags.signupForm.addEventListener('submit', (event)=> {
    event.preventDefault();

    const name = sginupTags.signupForm.name.value;
    const email = sginupTags.signupForm.email.value;
    const password = sginupTags.signupForm.password.value;

})
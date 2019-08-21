const mainSection = document.querySelector('.content-window')
const signinForm = document.getElementById('signin-form')
const login = loginForm = document.getElementById('login-form');
const formSection = document.querySelector('.form')

let url = 'http://localhost:8000/grandes-cientificos';


function start(){
    
    fetch(`${url}/home`).then(
        response => response.json()).then((response) => {
            if(response.homeNec){
                mainSection.innerHTML = response.html
            }
        }
    ).catch(err => console.log(err));
}

/*Función que se dividirá entre el addeventlistener (front) y el auth (back) */
signinForm.addEventListener('submit', (event)=> {
    event.preventDefault();

    const name = sginupTags.signupForm.name.value;
    const email = sginupTags.signupForm.email.value;
    const password = sginupTags.signupForm.password.value;

    const config = {
        method: 'post',
        body: JSON.stringify(
            { 
                name: name,
                email: email,
                ubication: password
            }
        ),
        headers:{
            'Content-Type': 'application/json'
          }
    }

    fetch(`${url}/signin`, 
    config).then((response)=> {response.json}).then((response)=>{
        mainSection.innerHTML = response.html;
    })

})

loginForm.addEventListener('submit', (event)=> {
    event.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // close the signup modal & reset form
      }).catch(err => {
        alert('El usuario y contraseña son incorrectos o no existen');
        restartModal();
        console.log('err')
      });

});

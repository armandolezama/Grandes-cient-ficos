const mainSection = document.querySelector('.content-window')
let signinForm;
let loginForm;
let formSection;

let url = 'http://localhost:8000/grandes-cientificos';


function start(){
    
    fetch(`${url}/home`).then(
        response => response.json()).then((response) => {
            if(response.homeNec){
                mainSection.innerHTML = response.html
                signinForm = document.getElementById('signin-form');
                loginForm = document.getElementById('login-form');
                formSection = document.querySelector('.form');

                signinForm.addEventListener('submit', (event)=> {
                    event.preventDefault();
                
                    const name = signinForm.name.value;
                    const email = signinForm.email.value;
                    const password = signinForm.password.value;
                
                    const config = {
                        method: 'post',
                        body: JSON.stringify(
                            { 
                                name: name,
                                email: email,
                                password: password
                            }
                        ),
                        headers:{
                            'Content-Type': 'application/json'
                          }
                    }
                
                    fetch(`${url}/signin`, config).then(
                        response => response.json()).then(
                            (responseJson)=>{
                            console.log(responseJson.html)
                        mainSection.innerHTML = responseJson.html;
                    }).catch(err=> console.log(err));
                
                });

            }
        }
    ).catch(err => console.log(err));
}

/*Función que se dividirá entre el addeventlistener (front) y el auth (back) */


// loginForm.addEventListener('submit', (event)=> {
//     event.preventDefault();

//     const email = loginForm.email.value;
//     const password = loginForm.password.value;

//     auth.signInWithEmailAndPassword(email, password).then((cred) => {
//         // close the signup modal & reset form
//       }).catch(err => {
//         alert('El usuario y contraseña son incorrectos o no existen');
//         restartModal();
//         console.log('err')
//       });

// });

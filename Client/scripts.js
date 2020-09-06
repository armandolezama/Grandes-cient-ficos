const mainSection = document.querySelector('.content-window')
let signinForm;
let loginForm;
let formSection;
let sendOpinion;
let operationElements = {};

let loader = `<div class='container'>
<div class='loader'>
  <div class='loader--dot'></div>
  <div class='loader--dot'></div>
  <div class='loader--dot'></div>
  <div class='loader--dot'></div>
  <div class='loader--dot'></div>
  <div class='loader--dot'></div>
  <div class='loader--text'></div>
</div>
</div>`;
let url = 'http://localhost:8000/grandes-cientificos';

function getingData(direction, body){
    const config = {
        method: 'post',
        body: JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
          }
    }

    fetch(`${url}/${direction}`, config).then(
        response => response.json()).then(
            (responseJson)=>{
            mainSection.innerHTML = responseJson.html;
            sendOpinion = document.getElementsByClassName('send-opinion');
            for(button of sendOpinion){
                let id = button.name;
                operationElements[`plusScoreOf${id}`] = document.getElementById(`score-plus-of-${id}`);
                operationElements[`lessScoreOf${id}`] = document.getElementById(`score-less-of-${id}`);
                operationElements[`inputOf${id}`] = document.getElementById(`input-of-${id}`);
                operationElements[`scoreOf${id}`] = document.getElementById(`score-of-${id}`);
                operationElements[`rankSectionOf${id}`] = document.getElementById(`rank-section-of-${id}`);

                operationElements[`plusScoreOf${id}`].addEventListener('click', ()=> {
                    if(operationElements[`scoreOf${id}`].innerHTML < 5){
                        value = parseFloat(operationElements[`scoreOf${id}`].innerHTML);
                        value += 0.5;
                        operationElements[`scoreOf${id}`].innerHTML = value;
                    }
                })

                operationElements[`lessScoreOf${id}`].addEventListener("click", ()=> {
                    if(operationElements[`scoreOf${id}`].innerHTML > 0){
                        value = parseFloat(operationElements[`scoreOf${id}`].innerHTML);
                        value -= 0.5;
                        operationElements[`scoreOf${id}`].innerHTML = value;
                    }
                })

                button.addEventListener('click', () => {
                    let configSend = {
                        method: 'post',
                        body: JSON.stringify({
                            id: id,
                            opinion: operationElements[`inputOf${id}`].value,
                            ranking: operationElements[`scoreOf${id}`].innerHTML
                        }),
                        headers:{
                            'Content-Type': 'application/json'
                          }
                    }
                    fetch(`${url}/client/send-opinion`, configSend).then(
                        response => response.json()).then(response => {
                            operationElements[`rankSectionOf${id}`].innerHTML += response.html;
                    }).catch(err => {console.log(err)})
                })
            }
    }).catch(err=> console.log(err));  
}

function start(){
    
    fetch(`${url}/home`).then(
        response => response.json()).then((response) => {
                mainSection.innerHTML = response.html
                signinForm = document.getElementById('signin-form');
                loginForm = document.getElementById('login-form');
                formSection = document.querySelector('.form');

                signinForm.addEventListener('submit', (event)=> {
                    event.preventDefault();

                    mainSection.innerHTML = loader;
                    const body = {
                        name: signinForm.name.value, 
                        email: signinForm.email.value, 
                        password: signinForm.password.value};
                    getingData('signin', body);
                });

                loginForm.addEventListener('submit', (event)=> {
                    event.preventDefault();
                    mainSection.innerHTML = loader;
                    const body = {
                        email:loginForm.email.value, 
                        password: loginForm.password.value};
                    getingData('login', body);
                })
        }
    ).catch(err => console.log(err));
}

function logout(){
    fetch(`${url}/logout`, {
        method: 'post',
        body: JSON.stringify({logout: true}),
        headers:{
            'Content-Type': 'application/json'
          }
    }).then(response => response.json()).then(
        response => {
            console.log(response)}
        );
        start()
}




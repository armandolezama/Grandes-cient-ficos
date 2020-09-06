const FbApp = require('.');
const auth = FbApp.auth();

function logout(req, res){
    if(req.body.logout){
        console.log(auth.signOut)
        auth.signOut().then(() =>{

            auth.onAuthStateChanged(user => {
                if(user){
                    console.log('user still loged')
                } else {
                    console.log('no user logged')
                    res.send({message: 'logout'})
                }
            })

            console.log('user logout')
            
        }).catch(err => console.log(err));
    }
}

module.exports = logout;
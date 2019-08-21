const dotenv = require('dotenv').config();
const firebase = require('firebase');

var config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID 
};

const FbApp = firebase.initializeApp(config);

module.exports = FbApp;

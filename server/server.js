const express = require('express')
const {  Client } = require('pg')
var session = require('express-session');
var socket = require('express-session');
var bodyParser = require('body-parser');
var MongoDBStore = require('connect-mongodb-session')(session);
var loginController = require('./controllers/loginController')
var userController = require('./controllers/userController')
var QuizzController = require('./controllers/quizzController')
const HistoriqueModel = require("./models/historiqueModel")
const mongoose = require('mongoose');
var urlmongo = "mongodb://127.0.0.1/db"; 
var userModel = require('./models/userModel')
// Nous connectons l'API à notre base de données
mongoose.connect(urlmongo, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express()
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(function(req, res, next) {
  const origin = req.headers.origin;
  if(origin){
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }
 
  next();
});


const PORT = 3209
// Stock l'objet pg connection en global
global.client = new Client({
  user: '',/*TODO*/
  host: '',/*TODO*/
  database: '',/*TODO*/
  password: ''/*TODO*/
})
client.connect()



var store = new MongoDBStore({
  uri: '',/*TODO*/
  collection: ''/*TODO*/
});



app.use(require('express-session')({
  secret: 'falafel',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: false,
  saveUninitialized: true,
}));



// Si l'utilisateur visite l'url par default il sera rediriger vers la page /login
app.get('/', (req, res) =>{
	res.redirect("/login")
	
})
// Verifie si un utilisateur est connecte et retourne ses infos
app.get('/user', (req, res) => {
  userController.printConnectedUser(req, res)
})
app.get('/users', (req, res) => {
  userController.doIfConnected(req, res,userController.getAllUsers)
})
// Renvoi les information d'un utilisateur (userID)
app.get('/user/:userId', (req, res) => {
  userController.getUser(req, res, req.params.userId)
});
app.post('/user/update', (req, res) => {
  console.log("here")
  userController.doIfConnected(req, res, userController.updateUser)
});
// Quand l'utilisateur se connecte on execute la fonction login du loginController qui permet de verifier les information et affiche le resultat en JSON

app.post('/login', (req, res) => {
	loginController.login(req, res)
	
})
app.get('/loginn', (req, res) => {
  res.sendFile('/nfs/data01/data/uapv19/uapv1900136/M1/ProjetWeb/backend-app/ceri-game/views/login.html')
	
})
app.get('/logout', (req, res) => {
  userController.doIfConnected(req, res,userController.logout)
})
// Recuperer un quizz aleatoire 
app.get('/quizz', (req, res) => {
	userController.doIfConnected(req, res,QuizzController.getQuizz)
	
})
// Recuperer l'historique d'un joueur (userId)
app.get('/user/:userId/historique', async (req, res) => {
	userController.doIfConnected(req, res,userController.getUserHistory)
})

app.get('/user/:userId/historique/defi', async (req, res) => {
	userController.doIfConnected(req, res,QuizzController.getHistoriqueDefi)
})
// Valider le quizz d'un joueur et renvoyer le resultat
app.post('/quizz/valider', (req, res) => {
  userController.doIfConnected(req, res,QuizzController.validerQuizz)
})

app.post('/defi/', (req, res) => {
  userController.doIfConnected(req, res,QuizzController.defier)
})
app.get('/defi', (req, res) =>{
  userController.doIfConnected(req, res,QuizzController.getDefi)
})

app.post('/defi/refuser', (req, res)=>{
  userController.doIfConnected(req, res,QuizzController.refuserDefi)
})
app.get('/top', (req, res)=>{
  QuizzController.getTop10(req, res)
})

// On lance le serveur sur le port 3209
const server = app.listen(PORT)

const io = require('socket.io')(server);
let connectedUsers = []
let sessions = []

setInterval(async()=>{ // Envoyer chaque 5sec le classement top 10
  let top10 = (await HistoriqueModel.getTop10()).rows;
  let classement = []
  for(var i in top10){
        let user = (await userModel.getUserById(top10[i].id_user)).rows[0];
        classement.push({user, score :top10[i].score})
  }
  //console.log("Sending TOP 10")
  io.emit("top-players", classement)
}, 5000)


io.sockets.on('connection', socketClient =>{
  socketClient.on('login', async data => { // Un utilisateur connecté visite le site
    var found = false;
    var user = connectedUsers.find(user => user.id==data.id) // On verifie si l'utilisateur est déja dans la liste des connecté
   if(!user){ // Si il n'est pas dans la liste on le met dans la liste, et on averti les autres utilisateur de sa connec
      var userResp = await userModel.getUserById(data.id);
      if(userResp.rows && userResp.rows.length>0){
        user = userResp.rows[0]
        delete user.motpasse
        user.session = [socketClient.id] // On ajoute la session dans la liste des session de l'utilisateur
        sessions[socketClient.id] = socketClient // On stocke la session dans la table des sessions
        connectedUsers.push(user); // On met a jours la liste des connecte*/
        io.emit('connectedUser', connectedUsers) // On averti les utilisateur connecte
      }

    }
    else{ // Sinon si il est déja dans la liste de connecté on verifie si ça session existe ou ses une nouvelle session
      const foundSession = user.session.find(session => session == socketClient.id);
      if(!foundSession){
        user.session.push(socketClient.id) // Si c'est ça premiere visite avec cette session on la met dans la liste des sessions de l'utilisateur
      }
        
    }
  })
  socketClient.on('send-notification', async data => { // Quand utilisateur veut envoyer une notification à un autre utilisateur
    console.log("Send notfi ")
    let userId = data.dest
    var user = connectedUsers.find(user => user.id==userId) // On récupere le destinataire de la notif si il est connecté
    var senderId = data.senderId
    if(user){ // Si il est connecté
      for(var i in user.session){ //  On parcours toutes les seessions de l'utilisateur
      console.log("Notific")
        sessions[user.session[i]].emit('notification', data.data) // On envoi la notification à chaque sessions
      }
    }
    else{
      console.log("Offline ",userId)
    }
  });
  socketClient.on('request', data => {
    socketClient.emit('connectedUser', connectedUsers)
  });
  socketClient.on('disconnect', () => {
    if(connectedUsers){
      const user = connectedUsers.find(user => user.session.find(session => session == socketClient.id));
      if(user){
        const index = user.session.indexOf(socketClient.id);
        if (index > -1) {
          user.session.splice(index, 1);
        }
        if(user.session==0){
          const index = connectedUsers.indexOf(user);
          if (index > -1) {
            connectedUsers.splice(index, 1);
          }
        }
      }
      else
        console.log("Disconnected none")
      io.emit('connectedUser', connectedUsers)
   }
  });
});

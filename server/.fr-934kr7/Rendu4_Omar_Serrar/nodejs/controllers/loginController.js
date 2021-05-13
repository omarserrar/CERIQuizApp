const express = require('express')
const sha1 = require('sha1');



/* La method execute la requete de connexion et envoi le resultat au callBack onConnection en dessous */
exports.login = function(req, res){
	const crypt = sha1(req.body.password)
	const username = req.body.username
	const password = req.body.password
	
  	client
	  .query('select * from fredouil.users where identifiant=$1 AND motpasse=$2', [username, crypt])
	  .then((resp) => {
	  	onConnection(resp, req.session, res)
	  })
	  .catch(e => console.error(e.stack))
	
}
/* La fonction verifie si le resultat de la requete est positive ou non
	retourne:
		-Si positive: JSON contenant une variable boolean connected, les information de l'utilisateur connecte, et la session (Pour les session sans cookie)
		-Si negative: JSON contenant une variable boolean false "connected", et le message d'erreur
*/
const onConnection = function(resp, session, res){
	if(resp.rows.length > 0){
		delete resp.rows[0].motpasse
		session.iduser = resp.rows[0].id
		session.connectionTime = new Date()
		let result = {connected: true, user: resp.rows[0], session: {sessionId: session.id, userId: session.iduser}}
		res.json(result)
	}
	else{
		let result = {connected: false, error: "Nom d'utilisateur ou Mots de Passe Incorrect"}
		res.json(result)
	}
}
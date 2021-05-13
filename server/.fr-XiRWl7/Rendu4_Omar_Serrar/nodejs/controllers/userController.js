const session = require('express-session');
var userModel = require('../models/userModel')
var HistoriqueModel = require('../models/historiqueModel')


/* La fonction demande au model UserModel de recuperer l'utilisateur don't l'id est celui de la session */
exports.updateUser = async function(req, res, user){
    let humeur = req.body.humeur;
    let avatar = req.body.avatar;
    if(humeur && avatar){
        let success =  (await userModel.updateUser(humeur, avatar, user.id)).rowCount
        console.log(success)
        if(success){
            res.json({success: true})
        }
        else{
            res.json({error: true})
        }
    }
}
// Affiche les information d'un utilisateur
const getUser = function(req, res, userId){
    if(userId){
        userModel.getUserById(userId).then((resp) =>
        {
            if(resp.rows.length == 0){
                
                res.json({error: true})
            }
            else{
                delete resp.rows[0].motpasse
                res.json({user: resp.rows[0]} )
            }
        })
    }  
    else
        res.json({error: true})
}
exports.logout = function(req, res, user){
    req.session.destroy();
    res.json({logout: true})
}
// Execute le callback si un utilisateur est connecte
exports.doIfConnected= async function(req, res, callback){
   try{
        let user = await getConnectedUser(req,res)
        if(user)
            callback(req,res,user)
        else
            res.json({connected: false})
    }
    catch(e){
        res.json({error: true, message: "Une erreur s'est produite", e})
    }

}
// Retourne l'utilisateur connecte
// False sinon
const getConnectedUser = async function(req, res){
    let id;
   
    if(req.session.iduser){
        id = req.session.iduser
    }
    else{
     //   id = (req.method == "POST")?req.body.userId: req.query.userId
    }
    
    if(id && id >0){
        let user = await userModel.getUserById(id)
        
        if(user.rows.length>0){
            return user.rows[0]
        }
    }
    
    return false

}
/* La fonction recupere l'utilisateur connecte a partir de la fonction en dessus "getConnectedUser" et affiche le resultat au format JSON */
const printConnectedUser = async function(req, res){
    let user =await getConnectedUser(req, res)
    if(user){
        delete user.motpasse
        res.json({user: user, connected: true, session: {sessionId: req.session.id, userId: user.id}} )
    }
    else
        res.json({connected: false, session: {sessionId: req.session.id, userId: -1}})
}
// Affiche l'historique d'un utilisateur
exports.getUserHistory= async function(req, res, user){
    let userId = req.params.userId
    let history = await HistoriqueModel.getUserHist(userId);
    res.json({userid: userId, history: history.rows})
}
// Affiche tous les utilisateur
exports.getAllUsers = async function(req,res, user){
    let users = (await userModel.getAllUsers()).rows;
    if(users){
        for(var i in users){
            delete users[i].motpasse;
        }
        res.json(users);
    }
    else{
        res.json({error:true})
    }
    
    
}
exports.getConnectedUser = getConnectedUser
exports.printConnectedUser = printConnectedUser
exports.getUser = getUser


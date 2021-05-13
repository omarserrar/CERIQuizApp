const {Quizz} = require("../models/quizzModel")
const {Defi} = require("../models/defiModel")
var userModel = require('../models/userModel')
const HistoriqueModel = require("../models/historiqueModel")
// Renvoi l'historique de defi d'un utilisateur
exports.getHistoriqueDefi = async function(req, res, user){
    let id = req.params.userId
    let historiqueData = (await HistoriqueModel.getDefiHistorique(id)).rows
    let historique = []
    let winCount = 0
    for(var i in historiqueData){
        let defi = historiqueData[i]
        let win = (defi.id_user_gagnant == id)
        let adversaireId = (win)?defi.id_user_perdant:defi.id_user_gagnant
        let adversaire = (await userModel.getUserById(adversaireId)).rows[0]
        if(adversaire) delete adversaire.motpasse
        if(win)
            winCount++;
        historique.push({defi, win, adversaire})
    }
    res.json({historique, win:winCount})
}
// Refuse un défi
exports.refuserDefi = async function(req, res, user){
    let id = req.body.id;
    Defi.findByIdAndRemove(id, (err, doc, ress)=>{
        console.log(ress," ",id)
        if(err){
            res.json({error:true})
        }
        else{
            res.json({success:true})
        }
    })
    
}
// Renvoi les defis en attente d'une reponse d'un utilisateur
exports.getDefi = async function(req, res, user){
    var defis = []
    var defi = await Defi.find({'id_user_defi': user.id})
    for(var i in defi){
        var defii  = defi[i]
        if(defii.id_user_defiant){
            let userId = defii.id_user_defiant
            let user = (await userModel.getUserById(userId)).rows[0]
            defis.push({defi: defii, user:user})
        }
    }
    res.json(defis)
}
// Defie un utilisateur
exports.defier = function(req, res, user){
    let defie = req.body.defie
    let score = req.body.score
    let quizz = req.body.quizz
    let defiantId = user.id
    let niveau = req.body.niveau
    if(defie && (score || score ===0) && quizz && defiantId && niveau){
        let defi = new Defi()
        defi.id_user_defi = defie
        defi.id_user_defiant = defiantId
        defi.score_user_defiant = score
        defi.quizz = quizz
        defi.niveau = niveau
        defi.save().then((resp) => {
            if(!resp)
                res.json({error: true})
            else
                res.json({success: true, resp})
        })
    }
    else{
        res.json({error: true})
    }
}
// Renvoi un quizz aletoire à l'utilisateur en fonction du niveau
exports.getQuizz = function(req, res, user){
    let questionNb = 10 // Nombre de question 10
    let level = (req.query.level)?parseInt(req.query.level):1

    Quizz.find({}).exec((err, resp)=> {
        let quizz = resp[Math.floor(Math.random() * resp.length)]; // Selectionne un quizz aleatoire de la base de donnees
        
        if(questionNb>quizz.quizz.length) // Si le nombre de question totale du quizz est inferieure au nombre de question(10) on change le nombre de questionn
            questionNb = quizz.quizz.length
        let questionsIndex = [] // Table des index de question choisi 
        let questions = [] // Table des question choisi
        // Choisi 10 questions aleatoire
        while(questions.length != questionNb){
            
            let questionIndex = Math.floor(Math.random() * quizz.quizz.length) // Choisi une question aleatoire
            if(!questionsIndex.includes(questionIndex)){ // Si la question n'a pas deja ete choisi on l'ajouter au tableau
                let question = quizz.quizz[questionIndex]
                let contientReponse = false
                let propositions = []
                let nombreProposition = (level+1>question.propositions.length)?question.propositions.length:level+1
                while(propositions.length != nombreProposition){ // On prend aleatoirement des proprositions
                    let proposition = question.propositions[Math.floor(Math.random() * question.propositions.length)];
                    if(!propositions.includes(proposition)){
                        propositions.push(proposition)
                        if(proposition == question.réponse)
                            contientReponse = true
                    }
                        
                }
                if(!contientReponse){ // Si aucune parmi les propositions choisi n'est la bonne, on remplace une proposition aleatoire par la bonne reponse
                    propositions[Math.floor(Math.random() * propositions.length)] = question.réponse
                }
                question.propositions = propositions 
                questionsIndex.push(questionIndex)
                delete question.réponse // Supprime l'attribut reponse pour eviter qu'un utilisateur ne le connait
                questions.push(question) // Ajoute la question et c'est proposition dans la table des question
            }
            
        }
        quizz.quizz = questions
        res.json(quizz) // Renvoi le quizz au client
            
    })
}
// Valide un quizz
exports.validerQuizz = function(req, res, user){
    
    if(req.body.isDefi) // Si c'est un defi
        validerDefi(req, res, user)
    else // Si c'est un quizz mono joueur
        validerQuizz(req, res, user)

   
}
function validerQuizz(req, res, user){
    let id = req.body.id
    let reponses = req.body.reponses
    let level = req.body.level?req.body.level:1
    let nbQuestion = 10
    let time = (req.body.time&&req.body.time>=nbQuestion)?req.body.time:nbQuestion // Calcule le temp total (temp minimal = nombre de question seconde (10s))
    let nbReponse = 0
    let resultat = []
    Quizz.findById(id).exec((err, resp)=> {
        let questions = resp.quizz
        for(var i =0;i<reponses.length;i++){ // Verifie les reponse une par une
            if(reponses[i].reponse.label == questions[reponses[i].question-1].réponse){
                resultat.push({indexquestion: i, id: reponses[i].question, correct: true, bonneReponse: questions[reponses[i].question-1].réponse,  anecdote: questions[reponses[i].question-1].anecdote})
                nbReponse++
            }
            else{
                resultat.push({indexquestion: i, idquestion: reponses[i].question, correct: false, bonneReponse: questions[reponses[i].question-1].réponse, anecdote: questions[reponses[i].question-1].anecdote})
            }
        }
        let score = parseInt((nbReponse==0)?0:((nbReponse)+(nbQuestion/time))*level*100)  ;
        let row = {score: score, id_user: user.id, niveau_jeu: level, nb_reponses_corr: nbReponse, temps: time, }
        
        if(HistoriqueModel.saveHist(row)){ // Sauvegarde le quizz dans l'historique puis renvoi le resultat au client
            res.json({score, questions:resultat, correct: nbReponse, nbQuestion})
        }
        else
            res.json({error: true, message: "Une erreur s'est produite."})
        
          
     })
}
function validerDefi(req, res, user){
    let id = req.body.id
    let reponses = req.body.reponses
    let level = req.body.level?req.body.level:1
    let nbQuestion = 10
    let time = (req.body.time&&req.body.time>=nbQuestion)?req.body.time:nbQuestion // Calcule le temp total (temp minimal = nombre de question seconde (10s))
    let nbReponse = 0
    let isDefi = req.body.isDefi;
    let resultat = []
    let model;
    Defi.findById(id).exec((err, resp)=> {
        let questions = resp.quizz
        for(var i =0;i<reponses.length;i++){// Verifie les reponse une par une
            if(reponses[i].reponse.label == questions[i].reponse){
                resultat.push({indexquestion: i, id: reponses[i].question, correct: true, bonneReponse: questions[i].reponse, anecdote: questions[i].anecdote})
                nbReponse++
            }
            else{
                resultat.push({indexquestion: i, idquestion: reponses[i].question, correct: false, bonneReponse: questions[i].reponse, anecdote: questions[i].anecdote})
            }
        }
        let score = parseInt((nbReponse==0)?0:((nbReponse)+(nbQuestion/time))*level*100)  ;
        let row = {score: score, id_user: user.id, niveau_jeu: level, nb_reponses_corr: nbReponse, temps: time, }
        
        let scoreDefiant = resp.score_user_defiant
        let win = (scoreDefiant < score)
        let winnerId = (win)?user.id:resp.id_user_defiant;
        let loserId = (win)?resp.id_user_defiant:user.id;
        if(HistoriqueModel.saveHistDefi(winnerId, loserId)){  // Sauvegarde le quizz dans l'historique puis renvoi le resultat au client
            Defi.findByIdAndRemove(id, (err, doc, res)=>{});
            res.json({score, questions:resultat, win, correct: nbReponse, nbQuestion})
        }
        else
            res.json({error: true, message: "Une erreur s'est produite."})
    })
}
exports.getTop10 = async function(req, res){
    let top10 = (await HistoriqueModel.getTop10()).rows;
    let classement = []
    for(var i in top10){
        let user = (await userModel.getUserById(top10[i].id_user)).rows[0];
        classement.push({user, score :top10[i].score})
    }
    res.json(classement)
}
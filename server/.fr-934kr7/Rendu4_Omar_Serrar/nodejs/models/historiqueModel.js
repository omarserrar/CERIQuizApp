const express = require('express')
/*
    Execute une requete pour trouver un utilisateur a partir de son ID
*/
exports.getUserHist = async function(userId){

    return await client.query('select * from fredouil.historique where id_user=$1', [userId])
}
exports.saveHistDefi = async function(winner, loser){
    await client.query("INSERT INTO fredouil.hist_defi(id_user_gagnant, id_user_perdant, date_defi) VALUES($1,$2,$3)",[winner, loser, new Date()])
}
exports.saveHist = async function(row){
    if(row.id_user&&row.niveau_jeu&&row.nb_reponses_corr&&row.temps&&row.score){
        var res =  await client.query("INSERT INTO fredouil.historique(id_user, date_jeu, niveau_jeu, nb_reponses_corr,temps,score) VALUES($1,$2,$3,$4,$5,$6) ", [row.id_user, new Date(), row.niveau_jeu, row.nb_reponses_corr, row.temps, row.score])
        return res;
    }
    return false;
}
exports.getTop10 = function(){
    const query = "select id_user, sum(score) as score from fredouil.historique group by id_user order by score desc limit 10";
    return client.query(query)
}    
exports.getDefiHistorique =function(id){
    const query = "select * from fredouil.hist_defi where id_user_gagnant=$1 OR id_user_perdant=$1 order by date_defi desc";
    return client.query(query, [id])
}
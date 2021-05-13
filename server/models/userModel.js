const express = require('express')
/*
    Execute une requete pour trouver un utilisateur a partir de son ID
*/
exports.getUserById = async function(userId){
    return await client
	  .query('select * from fredouil.users where id=$1', [userId])
}
exports.getAllUsers = async function(){
    return await client
	  .query('select * from fredouil.users')
}
exports.updateUser = function(humeur, avatar, id){
    return client
    .query('update fredouil.users set humeur=$1 , avatar=$2 WHERE id=$3',[humeur, avatar, id])
}
const mongoose = require('mongoose') 

var defiSchema = mongoose.Schema({
    id_user_defi : Number,
    id_user_defiant: Number,
    score_user_defiant: Number,
    niveau: Number,
    quizz: Array
},{ collection: 'defi' }); 
 
const Defi = mongoose.model('defi', defiSchema, 'defi');


exports.Defi = Defi;
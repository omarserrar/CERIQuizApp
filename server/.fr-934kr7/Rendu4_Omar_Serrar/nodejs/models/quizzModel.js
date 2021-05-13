const mongoose = require('mongoose') 

var quizzSchema = mongoose.Schema({
    fournisseur: String,
    rédacteur: String,
    thème: String,
    quizz: Array,
},{ collection: 'quizz' }); 
 
const Quizz = mongoose.model('quizz', quizzSchema, 'quizz');


exports.Quizz = Quizz;
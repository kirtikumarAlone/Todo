const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err))

const TodosSchema = new mongoose.Schema({
    title:{
        type:String,
      
    },
    description:{
        type:String,
        default:"",
        required:true
    },
    createdAt:{
        type:Date,
        time:Date.now
    },
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Todo',TodosSchema)


// module.exports={
//     Todo
// }
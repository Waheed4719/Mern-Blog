const mongoose = require('mongoose'),
      schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    role: {
        type: Number,
        default: 0
    },
    post: [{
        type: schema.Types.ObjectId,
        ref: 'Posts'
    }]
    
})


  module.exports = User = mongoose.model('User',userSchema)    
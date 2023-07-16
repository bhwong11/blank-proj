const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
})

module.exports = mongoose.model('Task', TaskSchema)
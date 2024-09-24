const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    Task: { type: String, required: true }, // Ensure Task is a required field
    order: { type: Number, required: false }, // Add order field
    done: { type: Boolean, default: false } // Add done field
}, {
    timestamps: true
});

const TodoModel = mongoose.model('todo', TodoSchema);
module.exports = TodoModel;

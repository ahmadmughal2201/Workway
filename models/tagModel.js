const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    title: String,
    popularity: {
        type: Number,
        default: 0,
    },
    active: {
        type: Boolean,
        default: true, // Assuming tags are active by default
    },
},
    { timestamps: true }
);

let Tags;
try {
    // Check if the model is already defined
    Tags = mongoose.model('Tags');
} catch (error) {
    // If the model is not defined, create it
    Tags = mongoose.model('Tags', tagSchema);
}

module.exports = Tags;

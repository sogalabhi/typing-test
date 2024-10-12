const mongoose = require('mongoose');
const { Schema } = mongoose;

const statSchema = new Schema({
    email: { type: String, required: true },
    id: { type: String, required: true },
    stats: { type: Map, required: true },
    date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('stats', statSchema);
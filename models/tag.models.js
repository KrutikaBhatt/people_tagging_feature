const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {v4 : uuidv4} = require('uuid');

const tagSchema = new Schema({
  name: {
    type: String,
    index: true,
    required: true,
    maxlength: 30,
  },
  details: {
    type: String,
    index: true,
    required: true,
    maxlength: 75,
  },
  organization_id: {
    type: String,
    required: false,
    default:uuidv4(),
  }
}, {
  timestamps: true,
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;

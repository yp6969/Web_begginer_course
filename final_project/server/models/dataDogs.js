const mongoose = require('mongoose');
const allDogsObjSche = mongoose.Schema({
  avilable: { type: Boolean, required: [true, 'avilable is riquired!'] },
  name: { type: String, required: [true, 'name is riquired!'] },
  url: { type: String, required: [true, 'url is riquired!'] },
  description: { type: String, default: '' },
});

const AllDogs = (module.exports = mongoose.model('AllDogs', allDogsObjSche));

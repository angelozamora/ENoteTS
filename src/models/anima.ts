import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({ name: String, type: String});

animalSchema.statics.findByName = function(name, cb) {
  return this.find({name: new RegExp(name, 'i')}, cb);
}

export default mongoose.model('Animal', animalSchema);
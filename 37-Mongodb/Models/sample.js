const { Schema} =require('mongoose');
const { model} =require('mongoose');
const demo = new Schema({
   userid: { type: String, required: true },
   name: { type: String, required: true },
   dob: { type: String, required: true }
   // Add other fields as needed
});


const sample = model('sample1', demo);
module.exports= sample;
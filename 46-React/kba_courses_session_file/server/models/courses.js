const { Schema} =require('mongoose');
const { model} =require('mongoose');

const courseSchema = new Schema({
   courseId: { type: String, required: true },
   title: { type: String, required: true },
   type: { type: String, required: true },
   description: { type: String, required: true },
   price: {type: String, required: true}
});

const courses = model('courses', courseSchema);

module.exports = courses;

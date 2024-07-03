const { Schema} =require('mongoose');
const { model} =require('mongoose');

const course = new Schema({
   courseId: { type: String, required: true },
   title: { type: String, required: true },
   type: { type: String, required: true },
   description: { type: String, required: true },
   price: {type: String, required: true}
});

const courses = model('courses', course);

module.exports= courses;

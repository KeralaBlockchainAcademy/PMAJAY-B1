const Router=require('express');
const sample =require ('./Models/demo.js')
var router=Router();
router.post('/create',async(req,res)=>{
   try{
       const data=req.body;
       const result=await sample.create(data);
       res.status(201).json(result);
   }
   catch(error){
       console.log(error);
       res.status(500).json();
   }
})
router.get('/read/:id',async(req,res)=>{


   const id = req.params.id;
  // console.log(id);
   const details = await sample.findOne({field1: id});
   //const details = await sample.find({});
  console.log("details",details);


   res.json(details);




})
module.exports=router;



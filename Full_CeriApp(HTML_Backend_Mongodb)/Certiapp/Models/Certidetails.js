const { Schema ,model} =require('mongoose');
const demo = new Schema({
   CertID:
      { type: String,
      required: true
      },

   CandName:
      { type: String,
    required: true 
      },

   CourseName:
      { type: String,
      required: true 
      },

   Grade: 
      { type: String, 
      required: true 
      },

   Date: 
      { type: String,
       required: true 
      }


   // Add other fields as needed
}  );


const CertiDetails = model('certidetails', demo);
module.exports= CertiDetails;
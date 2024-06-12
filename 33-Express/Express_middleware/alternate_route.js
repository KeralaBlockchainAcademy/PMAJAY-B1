const express = require('express');
const app = express();
const router = express.Router();

router.use('/',log);

router.get('/1', (req,res) => {
    res.send('Time displayed');
})

router.get('/2', (req,res) => {
    res.send('Time displayed in date router also here');
})

router.get('/3', (req,res) => {
    res.send('Time');
})



app.use('/posts/users', router)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });



const express = require('express');
const cors = require('cors');
// const fileUpload = require('express-fileupload');
const fs = require('fs')
const stream = require('stream')
const multer = require('multer')
const path = require('path')

// storage
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req,file,cb){
    console.log(file)
    cb(null,file.fieldname+new Date().toISOString().replace(/:/g, '-')+path.extname(file.originalname));
  }
});

//upload
const upload = multer({
  storage:storage
}).single('image')

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({
    origin: '*',
    credentials: true
}));
// app.use(express.json());
app.use(express.static('./public'));
// app.use(fileUpload());

app.post('/',(req,res)=>{
    upload(req,res,(err)=>{
      if(err){
        console.log(err,req.file,req.body);
        res.send('err');
      }else{
        console.log(req.file);
        res.json({file: `uploads/${req.file.filename}`});
      }
    })
    // const image=req.files.image;
    // image.mv(`${__dirname}/../frontend/public/uploads/${image.name}`, err => {
    //     if (err) {
    //       console.error(err);
    //       return res.status(500).send(err);
    //     }
    
        // res.json({ fileName: image.name, filePath: `/uploads/${image.name}` });
      // });

})
app.listen(PORT,()=>{
    console.log(`Server on ${PORT}`)
});
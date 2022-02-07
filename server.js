var express = require('express');
var app = express();
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const { urlencoded } = require('express');
const upload = multer();

app.use(cors());

//Middleware to parse body
app.use(express.json());
app.use(express.urlencoded({extended: "false"}));

//app.use(upload.any());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  if (!req.file){
    res.json({error: "No file found to analyze"});
  }else{
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  }
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

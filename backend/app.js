let express = require("express");
let app = express();
let mongoose = require("mongoose");
let dotenv = require("dotenv");
let path = require('path')
let morgan = require("morgan");
let cors = require("cors");
let inventoryRoute = require("./routes/inventoryRoute");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("mongoDB connected");
});

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", inventoryRoute);


if(process.env.NODE_ENV === 'production')
{
  console.log(111);
  console.log(path.join(__dirname,'../', '/frontend/build'));
  app.use(express.static(path.join(__dirname,'../', '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'))
  )
}

app.use(function (err, req, res, next) {
  // render the error page
  console.log("error consoling");
  console.log(err);
  res.status(500);
  res.json("error"); 
});

app.listen(3001, () => {
  console.log(`Server is running`);
});

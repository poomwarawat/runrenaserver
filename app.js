const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const con = require("./config/mySQL");
const multer = require("multer");
const upload = multer();

//----app setup
app.use(cors());
app.set("view engine", "pug");
app.enable("trust proxy");
app.use(bodyParser.urlencoded({ extended: true }));
//---- for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("public"));

//connect with mysql database
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected with database1");
});

//requiring routers
const authRoutes = require("./routes/auth");
const postStatus = require("./routes/post");
const eventRouter = require("./routes/event");
const friendRouter = require("./routes/friend");
const chatRouter = require('./routes/chat');

app.use("/", authRoutes);
app.use("/post", postStatus);
app.use("/", eventRouter);
app.use("/", friendRouter);
app.use('/', chatRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

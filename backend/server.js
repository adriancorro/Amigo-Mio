const express = require('express');
const cors = require("cors");
const userRouter =  require('./routes/user')
const path = require('path')
// set port, listen for requests
const PORT = process.env.PORT || 4000;

// initializing express application
const app = express();

/* const corsOptions = {
  origin: `https://`
}; */

/* app.use(cors(corsOptions)); */  // enable CORS */

app.use(express.json());

if(process.env.NODE_ENV === "production"){
   app.use(express.static(path.join(__dirname, '/../frontend/build')));

   app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../frontend/build'));
  })  

/* 
  if (!url.startsWith('/app/')) // we're on local windows
    url = url.substring(1);
  res.sendFile(url); */
  /* app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/build/index.html'))
  }) */

}

/* Without this, when refreshing, for example,
 https://amigo-mio-open-culture-center.herokuapp.com/Books, 
 try to make a request on the server type get and this behavior 
 is not wanted */



// Simple route
/* app.get('/', (req, res) => {
    res.send('Welcome to the final project :-)')
}); */

app.use("/user", userRouter);

app.listen(PORT, (err) => {
  if(err) return console.log(err)
  console.log(`Server is running on port ${PORT}.`);
});
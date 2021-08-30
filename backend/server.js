const express = require('express');
const cors = require("cors");
const userRouter =  require('./routes/user')
const path = require('path')
// set port, listen for requests
const PORT = process.env.PORT || 4000;

// initializing express application
const app = express();
app.use(express.json());

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, '/../frontend/build/')));

app.get('/*', (req, res) => {   
 let  url = path.join(__dirname + '/../frontend/build/', 'index.html');
 if (!url.startsWith('/app/')) // since we're on local windows
    url = url.substring(1);
    res.sendFile(url); 
}) 
/* app.use(express.static('./frontend/build' ));   
app.get('/*',  (req , res ) => {
  req.sendFile(path.join(__dirname, 'index.html'))
}) */
}

// parse requests of content-type - application/jsonc- - -  - 



/* let root = path.join(__dirname, '/frontend/build/') */

// Serve static files from the React frontend app
/* app.use(express.static(root)) */

/* app.use(express.static("frontend/build")); */
/* app.use(express.static ('client/build'));

const ruta = require ('ruta');

app.get ('*', (req, res) => {
  res.sendFile (path.resolve (__dirname, 'client', 'build', 'index.html'))}) */

/* app.use(express.static(path.join(__dirname, '../frontend/build/'))) */

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
}) */

 //this is the routing which will redirect your server url to react build file
/*  app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
}) */


/* 
const corsOptions = {
    origin: "/"
  };
  
app.use(cors(corsOptions));  // enable CORS */

// Simple route
app.get('/', (req, res) => {
    res.send('Welcome to the final project :-)')
});

app.use("/user", userRouter);



app.listen(PORT, (err) => {
  if(err) return console.log(err)
  console.log(`Server is running on port ${PORT}.`);
});
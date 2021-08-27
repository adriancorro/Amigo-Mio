const express = require('express');
const cors = require("cors");
const userRouter =  require('./routes/user')
const path = require('path')


// initializing express application
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

let root = path.join(__dirname, '/frontend/build/')

// Serve static files from the React frontend app
app.use(express.static(root))

/* app.use(express.static(path.join(__dirname, '../frontend/build/'))) */

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
}) */

 //this is the routing which will redirect your server url to react build file
 app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
})

const corsOptions = {
    origin: "/"
  };

app.use(cors(corsOptions));  // enable CORS

// Simple route
app.get('/', (req, res) => {
    res.send('Welcome to the final project :-)')
});

app.use("/user", userRouter);

// set port, listen for requests
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
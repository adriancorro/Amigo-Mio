const express = require("express");
const bcrypt = require("bcrypt");   // bcrypt is used to hash password before saving it to database
// const fs = require("fs");   // fs is node's inbuilt file system module used to manage files
const generateJWT = require("../utils/generateJWT")
const jwt = require("jsonwebtoken");
const { pool } = require("../database/db.config");   // import database connection
const authenticate = require("../middleware/authenticate");
const { query } = require("express");
require("dotenv").config();
const router = express.Router();   // we create a new router using express's inbuilt Router method
const ONEDAY = 86400;

// create a new user with the give email, name, and hashed password
router.post("/sign-up", (req, res) => {

  const lowerCaseEmail = req.body.email.toLowerCase();
  const findUser = {
    email: lowerCaseEmail
  };

  const valuesFind = [findUser.email]
  const queryFind = `SELECT * FROM users WHERE email = $1`;

  pool.connect((error, client, release) => {
    if (error) {
      return console.error('Error acquiring client', error.stack)
    }
    client.query(queryFind, valuesFind, (err, result) => {
      release();
      if (err) {
        console.log(err.message);
        return res.status(400).json({ err });
      }
      const user = result.rows[0];
      if (!user) {

        const newUser = {
          name: req.body.name,
          email: lowerCaseEmail,
          password: bcrypt.hashSync(req.body.password, 8)
        };

        const query = "INSERT INTO users(name, email, password) VALUES($1,$2,$3) RETURNING *";
        const values = [newUser.name, newUser.email, newUser.password];

        client.query(query, values, (err, result) => {
          // release();
          if (err) {
            console.log(err.message);
            return res.status(400).json({ err });
          }
          const user = result.rows[0];
          const token = jwt.sign(
            { id: user.id },
            process.env.jwtSecret,
            { expiresIn: ONEDAY }
          );
          const jwtToken = generateJWT(newUser.id);

          return res.status(200).send({
            isAuth: true,
            accessToken: jwtToken
          });
        });
      } else if (user.email === findUser.email) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      } 
    })
  });
});



// sign in with user given email and password
router.post("/sign-in", async (req, res) => {
  const lowerCaseEmail = req.body.email.toLowerCase();
  const findUser = {
    email: lowerCaseEmail
  };

  const query = `
    SELECT * FROM users WHERE email = $1`;
  const values = [findUser.email];
  pool.connect((error, client, release) => {
    if (error) {
      return console.error('Error acquiring client', error.stack)
    }
    client.query(query, values, (err, result) => {
      release();
      if (err) {
        console.log(err.message);
        return res.status(400).json({ err });
      }
      const user = result.rows[0];
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const jwtToken = generateJWT(user.id);

      res.status(200).send({
        isAuth: true,
        accessToken: jwtToken
      });
    });
  });
});


// get all users
router.get("/allusers", authenticate, async (req, res) => {
  console.log(req);
  pool
    .query("SELECT * FROM users")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
})


// get user profile
router.get("/userProfile", authenticate, async (req, res) => {
  const id =req.user.id
  const selectUser = "SELECT id, name, email, is_admin FROM users where id = $1"

	pool.connect((err, client, release) => {
		if (err) {
			return console.error("Error acquiring client", err.stack);
		}
		client.query(selectUser, [id])
    .then((result) =>{  release() ; res.json(result.rows)}) 
    .catch((e) => console.error(e));
	})
}) 
   
//This endpoint gives information about the user and the comment made to the book.
router.get("/booksCommentsUser/:bookId", function(req, res) { 
  const bookId =   parseInt(req.params.bookId) ;
  const queryBooksCommentsUserId = `SELECT users.name, comments.user_id, comments.comment, comments.id FROM users JOIN  comments ON users.id=comments.user_id JOIN books ON books.id=comments.book_id WHERE books.id =  $1 order by comments.id desc`
  if(!isNaN(bookId) && bookId > 0 ){ 
    pool
        .query(queryBooksCommentsUserId, [bookId])
        .then((result) => res.json(result.rows))
        .catch((e) => console.error(e))
  }else{
    res.send(`The value ${req.params.bookId} is not a number`)
  }
})

router.post("/commentInsert", (req, res) =>{
  //Desestructuración
  const {user_id, book_id, comment  } = req.body
  const insertDates = "INSERT INTO comments (user_id, book_id, comment) VALUES ($1, $2, $3) "
  pool.query(insertDates, [user_id, book_id, comment])
     .then(() => res.status(200).send({ message: "new comment" }) )
     .catch(e =>   {res.send(e); console.log(e) }    )
})  
 

// get all the books
router.get("/allbooks", async (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client
    .query(`SELECT * FROM books`)
    .then((result) =>{  release() ; res.json(result.rows)}) 
    .catch((e) => console.error(e));

}) 
})
router.get("/favorites/:userId", async (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    const userId =  parseInt(req.params.userId) ;
    const queryFavorites = `SELECT  books.approved,  books.id, books.title, books.descriptoin, books.views, books.image_url, books.likes FROM books JOIN favorites ON favorites.book_id=books.id JOIN users ON users.id=favorites.user_id  WHERE  favorites.user_id = $1`
    if(!isNaN(userId) && userId > 0 ){  
      client
      .query(queryFavorites, [userId]) 
      .then((result) => {release() ; res.json(result.rows)})
      .catch((e) => console.error(e));
    }
  })
}) 

router.post("/favoritesInsert", (req, res) => {
  //Desestructuración
  const {   user_id, book_id }  =   req.body  

  if( !isNaN(user_id) && user_id >  0 && !isNaN(book_id) && book_id >  0){
      const queryFind = `select count(*) as num FROM favorites WHERE user_id = $1  AND book_id  = $2`
      pool 
       .query(queryFind, [ parseInt(user_id),  parseInt(book_id)])
       .then( result => { 
          console.log(`Result.rows[0].num = ${result.rows[0].num}`)   
           if(result.rows[0].num == 0 ){
              const query = "INSERT INTO favorites (user_id, book_id) VALUES ($1, $2)";
              pool
              .query(query,[parseInt(user_id) , parseInt(book_id)])
              .then(() => res.send({ message: "Book has been added to favorites"}))
              .catch((e) => {console.error(e); res.send(e.detail) }); 
           }else{ 
               console.log({message: "The book already exists in the favorites"}) 
               res.send({message: "The book already exists in the favorites"}) 
           } 
          }) 
       .catch(e => res.send({message: "there was an error sending the parameters"}))   

  }else{
      res.send("invalid customer id")
  }
});

// get all comments
router.get("/comments", async (req, res) => {

  pool
    .query(`SELECT * FROM comments`)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));

}) 

// delete the comments
router.delete("/deleteComments/:id", authenticate, (req, res) => {
  const id =   parseInt(req.params.id)  
  // const id = 15 
  const query = `DELETE FROM comments WHERE id=$1`
  pool
    .query(query, [id])
    .then(() => res.status(200).send({ message: "delete" }) )
    .catch((e) => res.status(400).send({ message: e }) )
})

// changing email

router.patch("/changeEmail", authenticate, (req, res) => {

  const lowerCaseEmail = req.body.email.toLowerCase();
  const findUser = {
    email: lowerCaseEmail
  };

  const valuesFind = [findUser.email]
  const queryFind = `SELECT * FROM users WHERE email = $1`;

  pool.connect((error, client, release) => {
    if (error) {
      return console.error('Error acquiring client', error.stack)
    }
    client.query(queryFind, valuesFind, (err, result) => {
      release();
      if (err) {
        console.log(err.message);
        return res.status(400).json({ err });
      }
      const user = result.rows[0];
      if (!user) {

        const id = req.user.id
        const email = req.body.email.toLowerCase();
        const query = `UPDATE users set email=$1 where id=$2`
        pool
          .query(query, [email, id])
          .then(() => res.status(200).send({userEmail:"Email is updated"}))
          .catch((e) => console.error(e));

      } else if (user.email === findUser.email) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      } 
    })
  });
});

router.patch("/changeEmail", authenticate, (req, res) => { 
  const id = req.user.id
  const email = req.body.email.toLowerCase();
  const query = `UPDATE users set email=$1 where id=$2`
  pool
    .query(query, [email, id])
    .then(() => res.status(200).send({userEmail:"Email is updated"}))
    .catch((e) => console.error(e));

})

// changing username
router.patch("/changeUsername", authenticate, (req, res) => {
  const id = req.user.id
  const name = req.body.name;
  const query = `UPDATE users set name=$1 where id=$2`
  pool
  .query(query, [name, id])
  .then(() => res.status(200).send({Username:"Username is updated"}))
  .catch((e) => console.error(e));

})


// change password
router.patch("/changePassword", authenticate, (req, res) => {
  const id = req.user.id
  const password = bcrypt.hashSync(req.body.password, 8)
  const query = `UPDATE users set password=$1 where id=$2`
  pool
    .query(query, [password, id])
    .then(() => res.status(200).send({userPassword:"Password is updated"}))
    .catch((e) => console.error(e));

})

// Creating a end point where we can delete the user.
router.delete("/deleteAccount", authenticate, (req, res) => {
  const id = req.user.id
  // const id = 15
  const query = `DELETE FROM users WHERE id=$1`
  pool
    .query(query, [id])
    .then(() => res.status(200).send("The account is deleted"))
    .catch((e) => console.error(e));
  // Bug: If user is connected to other tables we should receive that error.

})

// Creating an endpoint where user can upload a book
router.post("/uploadBook" , authenticate, (req, res) => {
  
  const newBook = {
    title: req.body.title,
    description: req.body.description,
    img_url: req.body.img_url,
    store_url: req.body.store_url,
    store_url_dig: req.body.store_url_dig,
    user_id: req.user.id,
    suggest_age: req.body.suggest_age
  };
  console.log(newBook)

  const query = "INSERT INTO books (title, descriptoin,image_url, store_url, store_url_dig, user_id, suggest_age)  VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *"
  const values = [newBook.title, newBook.description, newBook.img_url, newBook.store_url,  newBook.store_url_dig, newBook.user_id, newBook.suggest_age]
  pool
  .query(query, values)
  .then(() => res.status(200).send({res:"Book is uploaded"}))
  .catch((e) => console.error(e));
  // Bug: If user is connected to other tables we should receive that error.

})

// Creating a endpoint where user can delete the book
router.delete("/deleteBook", authenticate, (req, res)=>{
  const id = req.user.id
  const bookId = req.body.bookId

  const query = `DELETE FROM books WHERE id=$1`
  pool
    .query(query, [bookId])
    .then(() => res.status(200).send("The book is deleted"))
    .catch((e) => console.error(e));

})

// this endpoint changes the approved status of a book
router.patch("/changeApproval", authenticate, (req, res)=>{
  const book = {
    bookId: req.body.id,
    approved: req.body.approved
  }
  const query = `UPDATE books set approved=$2 where id=$1`
  pool
    .query(query, [book.bookId,book.approved])
    .then(() => res.status(200).send({bookApproved: 'succesfully'}))
    .catch((e) => console.error(e));
} )



module.exports = router;   // we need to export this router to implement it inside our server.js files
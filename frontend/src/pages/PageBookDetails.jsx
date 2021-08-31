import React, {useState, useEffect,useContext} from 'react';
import { AppContext } from '../context/AppContext';
import FormBookComment from '../components/FormBookComment'
import getUserDetails from '../function/getUserDetails.js';

const PageBookDetails = (props) => { 


   // context
   let {currentUser} = useContext(AppContext);
/*   We use <Link to = {{pathname: '/ PageBookDetails', state: {foo: result}}}> 
  from CarouselItem.jsx and the way to share code from a <Link to = {} </Link> 
  is using const { book} = props.location.state */

    const {book} = props.location.state

      // state
      let [userCommentDetails, setUserCommentDetails] = useState([]);
      let [inputComment, setInputComment] = useState([]);
      let [newComment, setNewComment] = useState([]);
      let [dataUser, setDataUser] = useState([]);
      let [isAdmin, setIsAdmin] = useState([]);
      // api fetch comments  
      let API_BOOKS_COMMENTS = `/user/booksCommentsUser/${book.id}`;
      let API_COMMENT_USER = '/user/commentInsert'

      //localStorage      
      let email
      email = localStorage.getItem('email')

      useEffect(()=> {
        const validationUserInformation = async () =>{
          const requestAut = await  getUserDetails(email) 
          setIsAdmin(requestAut)
          console.log(isAdmin)
      }
      validationUserInformation()
       }, [userCommentDetails]);
  

        useEffect(()=> {
            fetch(API_BOOKS_COMMENTS)
                .then(res => res.json())
                .then(data =>{ setUserCommentDetails(data)}) 
                .catch(err => console.error(err.message))
        }, [newComment]);

  /* Getting data from the Form FormBookComment   */ 
  const GetPropsFormData = valores => {

    setInputComment(valores)
    /* Ensuring to obtain user information in the state */
    const validationUserInformation = async () =>{
      const requestAut = await  getUserDetails(email) 
      setDataUser(requestAut)
  }
  validationUserInformation()
  };

  const   fetchComments =  ()  => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: dataUser[0].id, book_id:  book.id , comment: inputComment})
  };

  fetch(API_COMMENT_USER, requestOptions)
      .then(response => response.json())
      .then(data =>{ setNewComment(data) ; console.log(data)})
      .catch((error) => {
        console.error(error);
      });
    
  }

  useEffect(()=> {
    dataUser.length > 0 && fetchComments()
  }, [dataUser]);

  const deleteComments = (id)  => {
    fetch(`/user/deleteComments/${id}`, {
      method: 'Delete',
      headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
      }
    })
      .then(res => res.json())
      .then(data => setNewComment(data))
      .catch(err => console.error(err)) 
}

    return ( 
    <div  className="container">
        <img className="" src={book.image_url} alt=""  />
        <div className="">
          <p className="">{book.title}  </p>
          <p className="">Likes: {book.likes} </p>
          <h3>Description:</h3>
          <p className="">Descriptoin: {book.descriptoin} </p>
        </div>
        <br></br>
        { currentUser && <div><FormBookComment sendFuntion={GetPropsFormData} /></div>}
        <br></br>
        <h3>{userCommentDetails.length >= 1   ?  ("Comments") : ("No comments have been made, be the first to comment on this book!") }</h3> 
        <div>{userCommentDetails ?
              (userCommentDetails.map((bookcommentDetail, index) => {
                        return <div key={index}>
                                {   console.log(isAdmin)}
                                  <p>-------------------------------------------------</p>
                                  <h5>Nombrev:</h5>
                                  <p> {bookcommentDetail.name}</p>
                                  <h5>Comment:</h5>
                                  <p> {bookcommentDetail.comment}</p> 
                                  {isAdmin.length  &&  (isAdmin[0].is_admin  || isAdmin[0].id == bookcommentDetail.user_id) &&  <button className= "btn btn-danger" onClick={(e) => deleteComments(bookcommentDetail.id, e)}>Delete comment</button>}  
                                   
                                  <p>-------------------------------------------------</p>
                              </div>
              })) 
              :
              (<span>Loading...</span>)}
         </div>
      
      </div>
    )
};





  
  
  export default PageBookDetails;
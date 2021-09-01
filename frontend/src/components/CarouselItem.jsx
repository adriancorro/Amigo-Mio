import React , {useState, useEffect, useContext} from 'react';
import '../assets/styles/components/carouselItem.css';
import img from '../assets/images/save.png'
import {Link} from 'react-router-dom';
import getUserDetails from '../function/getUserDetails.js';
import { AppContext } from '../context/AppContext';
let CarouselItem = (props)=> { 
  // context
  let {setButtonFavStatus, dataBooksFavorites, userEmail, setButtonFavStatusDelete} = useContext(AppContext);
  // state
  let [saveDataBookId, setSaveDataBookId] = useState([]);
  let [dataUser, setDataUser] = useState([]);
  let [pressButton, setPressButton] = useState(false);
  let [pressButtonDelete, setPressButtonDelete] = useState(false);
  let [alertMessage, setAlertMessage] = useState(false);
  let [saveDataBookIdDelete, setSaveDataBookIdDelete] = useState(false);
  // api 
  let API_FAV_POST = `/user/favoritesInsert`;
  let API_FAV_DELETE = `/user/deleteFavorites`;

  let email
     email = localStorage.getItem('email')
  
  useEffect(()=> {
    const validationUserInformation = async () =>{
      const requestAut = await  getUserDetails(email) 
      setDataUser(requestAut)
      
  }
  validationUserInformation()
  
  return () => {
    setDataUser({}); 
  };
 
   }, []);

    
   const getIdBook = (e) => {
    const value = e.currentTarget.getAttribute("data-value")
    setSaveDataBookId(value)
    setPressButton(value)
    setButtonFavStatus(value)
  }

  const getIdBookDelete = (e) => {
    const value = e.currentTarget.getAttribute("data-value-delete")
    setButtonFavStatusDelete(value)
    setSaveDataBookIdDelete(value)
    setPressButtonDelete(value)
  }

  useEffect(()=> {
    (dataUser.length > 0  && pressButton)  && favPost()
    setTimeout(() => {
      setAlertMessage(false)
    }, 7000);
   
  }, [pressButton]);

  useEffect(()=> {
    (dataUser.length > 0  && pressButtonDelete)  && deletePost()
    setTimeout(() => {
      setAlertMessage(false)
    }, 800000);
   
  }, [pressButtonDelete]);


   const   favPost =  ()  => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: dataUser[0].id, book_id:  saveDataBookId})
  };

 
  fetch(API_FAV_POST, requestOptions)
      .then(response => response.json())
      .then(data =>{ setPressButton(false)  ; setAlertMessage(data) ;  setButtonFavStatus(false) ; console.log(data)
          })
      .catch((error) => {
        console.error(error);
      });

     
  }


  const   deletePost =  ()  => {  
    const requestOptionsDelete = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: dataUser[0].id, book_id:  saveDataBookIdDelete})
  };

  fetch(API_FAV_DELETE, requestOptionsDelete) 
  .then(response => response.json())
  .then(data =>{ setAlertMessage(data) ;  setButtonFavStatusDelete(false) ; setPressButtonDelete(false)
      })
  .catch((error) => {
    console.error(error);
  });

  

  }
  
    return (
        <> 
       
        {alertMessage && alertMessage.message =="Book has been added to favorites" &&
         <div class="container">
         <div class="row">
         <div className="alert alert-success alert-dismissible fade show col-sm-3" role="alert">
         <strong>Holy success!</strong> {alertMessage.message}
         <button type="button" className="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
     </div>
     </div>
     </div>
        }

        {alertMessage && alertMessage.message =="The book already exists in the favorites" && 
        <div class="container">
        <div class="row">
         <div className="alert alert-warning alert-dismissible fade show col-sm-3" role="alert">
         <strong>Holy guacamole with pina colada!</strong> {alertMessage.message}
         <button type="button" className="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
     </div>
     </div>
     </div>
        }

        
     {props.results != undefined ?  
     (       
      props.results.map((result, index )=> { 
        if (result.approved === true ){
          return  <div key={index}  className="carousel-item">
          <img className="carousel-item__img" src={result.image_url} alt=""  />
          <div className="carousel-item__details">
            <p className="carousel-item__details--title">{result.title}  </p>
            <p className="carousel-item__details--subtitle">Likes: {result.likes} </p>
            {dataUser.length && dataUser[0] &&
            <div className="img_container">
               
               {dataBooksFavorites  && (dataBooksFavorites.find(e => e.id == result.id)) ?
                (<img src={img} className="save_img"   onClick={getIdBookDelete}  data-value-delete={result.id }  />) 
              :
              (<img src={img} className="img_containerFilter"   onClick={getIdBook}  data-value={result.id }  />)
              }
            </div>}
            <span className=""  ></span><Link to={{ pathname: '/PageBookDetails', state: { book: result} }}>See book details</Link>
          </div>
        </div>
        }
      })  
    ) 

     :
    (<span>loading...</span>)}
        </>
    );
};



export default CarouselItem;
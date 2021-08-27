import React , {useState, useEffect, useContext} from 'react';
import '../assets/styles/components/carouselItem.css';
import img from '../assets/images/save.png'
import {Link} from 'react-router-dom';
import getUserDetails from '../function/getUserDetails.js';
import { AppContext } from '../context/AppContext';
let CarouselItem = (props)=> { 
  // context
  let {setSuttonFavStatus, dataBooksFavorites} = useContext(AppContext);
  // state
  let [saveDataBookId, setSaveDataBookId] = useState([]);
  let [dataUser, setDataUser] = useState([]);
  let [pressButton, setPressButton] = useState(false);
  let [alertMessage, setAlertMessage] = useState(false);
  // api fetch comments  
  let API_FAV_POST = `http://localhost:4000/user/favoritesInsert`;
  let API_FAV_GET = `http://localhost:4000/user/favorites`;

  useEffect(()=> {
    const validationUserInformation = async () =>{
      const requestAut = await  getUserDetails() 
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
    setSuttonFavStatus(value)
  }
  useEffect(()=> {
    (dataUser.length > 0  && pressButton)  && favPost()
    setTimeout(() => {
      setAlertMessage(false)
    }, 7000);
   
  }, [pressButton]);


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
      .then(data =>{ setPressButton(false)  ; setAlertMessage(data) ;  setSuttonFavStatus(false) ; console.log(data)
          })
      .catch((error) => {
        console.error(error);
      });
    
  }
  
    return (
        <> 
       
        {alertMessage && alertMessage.message =="Book has been added to favorites" &&
         <div className="alert alert-success alert-dismissible fade show" role="alert">
         <strong>Holy success!</strong> {alertMessage.message}
         <button type="button" className="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
     </div>
        }

        {alertMessage && alertMessage.message =="The book already exists in the favorites" && 
         <div className="alert alert-warning alert-dismissible fade show" role="alert">
         <strong>Holy guacamole with pina colada!</strong> {alertMessage.message}
         <button type="button" className="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
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
            <div className="img_container"  onClick={getIdBook}  data-value={result.id } >
               
               {dataBooksFavorites  && (dataBooksFavorites.find(e => e.id == result.id)) ?
                (<img src={img} className="img_containerFilter"/>) 
              :
              (<img src={img} className="save_img"/>)
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
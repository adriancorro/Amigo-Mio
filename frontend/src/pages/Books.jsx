import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../context/AppContext';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import "../assets/styles/pages/books.css" 
import getUserDetails from '../function/getUserDetails.js';


let Books = ()=> {
    // context
    let {currentUser, buttonFavStatus, setDataBooksFavorites, buttonFavStatusDelete} = useContext(AppContext);
    // state
    let [books, setBooks] = useState([]);
    let [booksFavorites, setBooksFavorites] = useState([]);
    let [dataUser, setDataUser] = useState([]);
     let booksFvas
    // api 
    let API = "/user/allbooks";
    let API_FAVORITES = `/user/favorites/${ dataUser.length && dataUser[0].id}`;
    let email
     email = localStorage.getItem('email')
   
   // fetch
   let apiBooksFavs = () => {
    fetch(API_FAVORITES, {
        method: 'GET', 
        mode: 'cors', // no-cors, *cors, same-origin
    })
        .then(res => res.json())
        .then(data =>{ setBooksFavorites(data) ; setDataBooksFavorites(data)})
        .catch(err => console.error(err.message))
    }
    let apiBooks = () => {
    fetch(API, {
        mode: 'cors', // no-cors, *cors, same-origin
    })
    .then(res =>  res.json()) 
    .then(data => setBooks(data))
    .catch(err => console.error(err.message)) 
    }
      
     
    //we bring user data
    useEffect(()=> {
            const validationUserInformation = async () =>{
                const requestAut = await  getUserDetails(email) 
                console.log(requestAut)
                await  setDataUser(requestAut)
        }
        validationUserInformation()
    }, []); 
    
    useEffect(()=> {
            apiBooks()
            apiBooksFavs()
        console.log(books) 
    }, []);

    // Cuando se presiones el boton de fav se llamara a la funcion apiBooksFavs()
    useEffect(()=> {
        dataUser.length > 0 &&  apiBooksFavs()
    }, [buttonFavStatus]);

    useEffect(()=> {
        dataUser.length > 0 &&  apiBooksFavs()
    }, [buttonFavStatusDelete]);
    
    // Solo cuando dataUser obtenga toda la info del usuario se llamara a la funcion apiBooksFavs
    useEffect(()=> {
        dataUser.length > 0 && apiBooksFavs()
     }, [dataUser]);

    return ( 
        <>              
           
            <center className="galery-center"><h1>Books</h1></center>    
            <main className="main__container">
                {
                    currentUser 
                    ?
                        <>  {booksFavorites.length > 0 ? 
                            (<Categories title="My list">
                            <Carousel>
                                <CarouselItem/>
                                    <CarouselItem  results={booksFavorites}  />
                                <CarouselItem/>
                            </Carousel>
                           </Categories>) 
                           :
                           ( <h5 className = "container favoritesTitle" >
                            There are no favorites on your list.
                            <small className="text-muted"> Add a book to favorites!</small>
                        </h5>)
                          }
                           
                            <Categories title="All books">
                                <Carousel>
                                        <CarouselItem  results={books}  />
                                </Carousel>
                            </Categories>

                            {/* <Categories title="Trend">
                                <Carousel>
                                    <CarouselItem/>
                                    <CarouselItem/>
                                </Carousel>
                            </Categories> */}
                        </>
                    :    
                        <>
                            <Categories title="All books">
                                <Carousel>
                                    <CarouselItem  results={books}  />
                                </Carousel>
                            </Categories>
                            <Categories title=" ">
                                <Carousel>
                                    <CarouselItem/>
                                    <CarouselItem/>
                                </Carousel>
                            </Categories>
                        </>
                }
            </main>
        </>
    );
};

export default Books;
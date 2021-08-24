import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../context/AppContext';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import "../assets/styles/components/Gallery.css" 




let Gallery = ()=> {

    let token

     setTimeout(function() {
         token = localStorage.getItem('userInformation');
    }, 300);

    // context
    let {currentUser} = useContext(AppContext);
    // state
    let [books, setBooks] = useState([]);

    // api 
    let API = "http://localhost:4000/user/allbooks";
   
    useEffect(()=> {
        fetch(API)
            .then(res => res.json())
            .then(data =>{ setBooks(data)})
            .catch(err => console.error(err.message))
    }, []);
    // console.log(books)
    return (
        <>              
           
            <center className="galery-center"><h1>Community Books</h1></center>    
            <main className="main__container">
                {
                    currentUser 
                    ?
                        <>
                            <Categories title="My list">
                                <Carousel>
                                    <CarouselItem/>
                                    <CarouselItem/>
                                </Carousel>
                            </Categories>
                            <Categories title="All books">
                                <Carousel>
                                        <CarouselItem  results={books}  />
                                </Carousel>
                            </Categories>
                            <Categories title="Trend">
                                <Carousel>
                                    <CarouselItem/>
                                    <CarouselItem/>
                                </Carousel>
                            </Categories>
                        </>
                    :    
                        <>
                            <Categories title="All books">
                                <Carousel>
                                    <CarouselItem  results={books}  />
                                </Carousel>
                            </Categories>
                            <Categories title="Trend">
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

export default Gallery;
import React from "react";
import tree from '../assets/images/tree.png';
import art_person from '../assets/images/art_person.png';
import amigo_mio from '../assets/images/amigo_mio.png';

const SectionMainBanner = () => {
   

    return (
      
      <header>
        <div className="container-fluid">
          <div className="contenido">
<<<<<<< HEAD
            <img className="element-animation tree-img img-fluid float-left"
                src={tree}> 
            </img>
            <img className="element-animation2 art-person-img img-fluid  float-left"
                src={art_person} > 
            </img>
            <img className="element-animation3 amigomio-img img-fluid  float-left"
                src={amigo_mio} alt="amigo mio" > 
            </img>
=======
            <div className="backgroundMain" >
            <div className="cuadroparatextos">
                  <h1>Welcome to Amigo Mío</h1>
                  <h4>An awareness tool for the population</h4>
                  <a className="boton" href="#section">Lear More</a>
            </div>
            </div>
>>>>>>> 96337563a2e778815bf2078ad0edd9d1685d8831
          </div>
        </div>
      </header>
    );
  };
  
  export default SectionMainBanner;
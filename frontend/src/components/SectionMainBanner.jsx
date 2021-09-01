import React from "react";
import '../assets/styles/components/sectionMainBanner.css';
import { HashLink as Link } from 'react-router-hash-link';

const SectionMainBanner = () => {
    return (
      <header>
        <div className="container-fluid"> 
          <div className="contenido">
            <div className="backgroundMain" > 
            <div className="cuadroparatextos">
                  <h1>Welcome to Amigo Mío</h1>
                  <h4>The book My friend! It explains the journey of refugees through illustrations made by the children themselves.</h4>
                  <Link className="boton" to="#/#section">Learn More</Link>
            </div>
            </div> 
          </div>
        </div>
      </header>
    );
  };
  
  export default SectionMainBanner;
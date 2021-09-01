import React from "react"; 
import twitter from '../assets/images/twitter.png';
import facebook from '../assets/images/facebook.png';
import instagram from '../assets/images/instagram.png';
import youtube from '../assets/images/youtube.png';
import linkedi from '../assets/images/linkedi.png';
import '../assets/styles/components/footer.css'
       
   
const Footer = () => {


  return (
    <footer id="footer" className="pt-4 mt-4"> 
        <div className="container ">
        <div className="row text-center pt-2">
              <div className="col-12 col-lg pb-1" >
                <a target="_blank" rel="noreferrer" href="https://www.google.com/maps/place/Open+Cultural+Center,+Carrer+del+Rec,+27,+08003+Barcelona/@41.3860019,2.1823493,15z/data=!4m2!3m1!1s0x12a4a2fdd0e3846f:0x5b7de3c819c66eb0">OUR CENTERS</a>
              </div>
              <div className="col-12 col-lg pb-1">
                <a target="_blank" rel="noreferrer" href="https://openculturalcenter.org/contact/">CONTACT US</a>
              </div>
              <div className="col-12 col-lg pb-1">
                <a target="_blank" rel="noreferrer" href="/">TERMS AND CONDITIONS</a>
              </div>
              <div className="col-12 col-lg pb-1">
                <a target="_blank" rel="noreferrer" href="/">FREQUENT QUESTIONS</a>
              </div>
          </div>
          <div className="row text-center justify-content-lg-center pb-4 pt-4">
              <div className="col-12 col-lg-1 pr-0 pl-0 pb-1">
                <a target="_blank" rel="noreferrer" href="https://twitter.com/occ_project"><img src={twitter} alt="logo-twitter" width="40rem" /></a>
              </div>
              <div className="col-12 col-lg-1 pr-0 pl-0 pb-1">
                <a target="_blank" rel="noreferrer" href="https://www.facebook.com/OpenCulturalCenter/"><img src={facebook} alt="logo-facebook" width="40rem" /></a>
              </div>
              <div className="col-12 col-lg-1 pr-0 pl-0 pb-1">
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/openculturalcenter/"><img src={instagram} alt="logo-instagram" width="40rem" /></a>
              </div>
              <div className="col-12 col-lg-1 pr-0 pl-0 pb-1">
                <a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UC-5iSWf52DKacThUkicp1pA"><img src={youtube} alt="logo-youtube" width="40rem" /></a>
              </div>
              <div className="col-12 col-lg-1 pr-0 pl-0 pb-1">
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/open-cultural-center/"><img src={linkedi} alt="logo-linkedi" width="40rem" /></a>
              </div>
          </div>
          <div className="row text-center">
              <div className="col-12 col-lg pb-2 pt-2">
                 ©Copyright. 2021 Amigo mio Project. All rights reserved. MigraCode - Team 2 Project - Adrian, Emilio, Ali and Artur.
              </div>
          </div>
        </div>
    </footer>
  );
};

  
  export default Footer;
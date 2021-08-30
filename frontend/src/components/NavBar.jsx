import React, {useContext} from "react";
import { Link } from 'react-router-dom';
import {AppContext} from '../context/AppContext';
import '../assets/styles/components/navbar.css';
import iconsExit from '../assets/icons/icons-exit.png';


const NavBar = () => {
  let {currentUser, setCurrentUser, setIsAdmin} = useContext(AppContext);
  
    return (

      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid">
          <h3 className="navbar-brand" >Amigo Mío</h3>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" collapse navbar-collapse  " id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto ">
              <li className="nav-item active ">
                <span className="nav-link" ></span>  <Link  to="/">Home</Link> <span className="sr-only">(current)</span>
              </li>
              <li className="nav-item">
                <span className="nav-link"  ></span><Link to="/Books">Books</Link>
              </li>
              {
                currentUser 
                ? 
                  <>
                    <li className="nav-item">
                      <span className="nav-link" ></span><Link to="/userProfile">Profile</Link>
                    </li>
                    <li className="nav-item">
                      <span className="nav-link" ></span>
                      <Link to="/" onClick = {()=> {
                        localStorage.removeItem('user')
                        localStorage.removeItem('jwt')
                        setCurrentUser(JSON.parse(localStorage.getItem('user')))
                        setIsAdmin(false)
                        }}
                       >Sign off <img src={iconsExit} alt="exit" width='20px' />
                      </Link>
                    </li>
                  </>
                :
                  <>
                  <li className="nav-item">
                    <span className="nav-link" ></span><Link to="/SignIn">Login</Link>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link"  ></span><Link to="/SignUp">Register</Link>
                  </li>
                  </>
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default NavBar;

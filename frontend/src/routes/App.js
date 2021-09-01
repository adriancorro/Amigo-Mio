import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {BrowserRouter, Route, Switch ,HashRouter } from 'react-router-dom';
import Main from '../pages/Main';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import NotFound from '../pages/NotFound';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Books from '../pages/Books';
import PageBookDetails from '../pages/PageBookDetails';
import UserProfile from "../pages/UserProfile";
import ChangeUserName from "../pages/ChangeUserName";
import ChangeUserEmail from "../pages/ChangeUserEmail";
import ChangeUserPassword from "../pages/ChangeUserPassword";
import RegisterBook from "../pages/RegisterBook";
import ApproveBooks from "../pages/ApproveBooks";
// import '../App.css';

function App() {
  // context
  let { currentUser, isAdmin } = useContext(AppContext)

  return (
      <BrowserRouter>
          <NavBar /> 
          <Switch>
              <Route exact path='/' component={Main}/>
              <Route exact path='/signup' component={SignUp}/>
              <Route exact path='/signin' component={SignIn}/>
              <Route exact path='/Books' component={Books}/>
              <Route exact path='/userProfile' component={currentUser ? UserProfile : NotFound}/>
              <Route exact path='/PageBookDetails' component={PageBookDetails}/>
              <Route exact path='/changeUserName' component={currentUser ? ChangeUserName : NotFound}/>
              <Route exact path='/changeUserEmail' component={currentUser ? ChangeUserEmail : NotFound}/>
              <Route exact path='/changeUserPassword' component={currentUser ? ChangeUserPassword : NotFound}/>
              <Route exact path='/registerBook' component={ currentUser ? RegisterBook : NotFound}/>
              <Route exact path='/approvebooks' component={isAdmin ? ApproveBooks : NotFound}/>
              <Route component={NotFound}/>
          </Switch>
          <Footer /> 
      </BrowserRouter>
  );
}

export default App;

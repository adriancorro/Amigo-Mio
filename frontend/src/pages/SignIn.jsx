import React, {useState, useContext} from 'react';
import {AppContext} from '../context/AppContext';
import { Link } from 'react-router-dom';
import '../assets/styles/pages/signUpAndSingIn.css';
import swal from 'sweetalert';


const SignIn = props => {
    //context
    let {setCurrentUser, setUserEmail} = useContext(AppContext);
    //state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setState = [setEmail, setPassword];

    //Api
    const API = "/user/sign-in";

    //funtions 
    const handleOnChange = event => {
        let id = event.target.id;
        let value = event.target.value;

        switch (id) {
            case "email":
                setEmail(value)
                break;
            case "password":
                setPassword(value)
                break;    
            default:
                console.error('id does not exist')
                break;
        };
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();

        const user = {
            "email": email,
            "password": password
        };
        // console.log(user)
        fetch(API, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if(data.isAuth) {
                   
                    localStorage.removeItem("user")
                    localStorage.removeItem("jwt")
                    localStorage.setItem("jwt", JSON.stringify(data.accessToken))
                    localStorage.setItem("user", JSON.stringify(data.isAuth))
                    swal('Login successfully')
                    setCurrentUser(JSON.parse(data.isAuth))
                    setUserEmail(user.email)
                    props.history.push("/")
                }else {
                    swal('Error user or password do no exist')
                }
            })
            .catch(err => swal(err.message));

        setState.forEach(state => state(""));
    }

    return(
        <main className="main-sign-up">
            <div className="div-sign-up">
                <center><h1>Login</h1></center>
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label  className="form-label">Email</label>
                        <input onChange={handleOnChange} type="email" 
                            className="form-control" id="email" placeholder="email@email.com" 
                            minLength="1"
                            maxLength="256" 
                            value={email} autoComplete="on"/>
                    </div>
                    <div className="mb-5">
                        <label  className="form-label">Password</label>
                        <input onChange={handleOnChange} type="password" 
                            className="form-control" id="password" placeholder="passsword" 
                            maxLength="8"
                            minLength="8" 
                            value={password} autoComplete="on"/>
                    </div>
                    <div className="mb-4">
                        <button className="btn form-control" type="submit">Submit</button>
                    </div>
                    <div className="mb-3">
                        <center>Don't have an acount? <Link to="/signup">Sign up</Link></center>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default SignIn;


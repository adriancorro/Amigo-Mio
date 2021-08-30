import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/pages/signUpAndSingIn.css';
import iconsChange from '../assets/icons/icons-changes.png';
import swal from 'sweetalert';

const ChangeUserEmail = (props)=> {
    // state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setState = [setEmail, setPassword];

    // api
    let API_C_EMAIL = '/user/changeEmail';
    
    // functions
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

    const handleOnSubmit = event => {
        event.preventDefault();

        const newUser = {
            "email": email,
            "password": password 
        };
        // console.log(newUser)
        fetch(API_C_EMAIL, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if(data) {
                    swal(data.userEmail)
                   props.history.push("/userProfile")  
                }else {
                    swal(data.error)
                }
            })
            .catch(err => swal(err.message) );

        setState.forEach(state => state(""))
    };

    return (
        <main className="main-sign-up">
            <div className="div-sign-up">
                <center><h1>Email Change <img src={iconsChange} alt='icons-change' width='30px'/></h1></center>
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label  className="form-label">New Email</label>
                        <input onChange={handleOnChange} type="email" 
                               className="form-control" id="email"
                               maxLength="256"  
                               placeholder="email@email.com" value={email} autoComplete="on"/>
                    </div>
                    <div className="mb-5">
                        <label  className="form-label">Password</label>
                        <input onChange={handleOnChange} type="password" 
                               className="form-control" id="password"
                               maxLength="8"
                               minLength="8"  
                               placeholder="passsword" value={password} autoComplete="on"/>
                    </div>
                    <div className="mb-4">
                        <button className="btn form-control" type="submit">Change</button>
                    </div>
                    <div className="mb-3">
                        <center>Go Back!!! <Link to="/userProfile">Profile</Link></center> 
                    </div>
                </form>
            </div>
        </main>
    );
};

export default ChangeUserEmail;
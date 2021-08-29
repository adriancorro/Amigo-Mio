import React, {useContext, useState} from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import '../assets/styles/pages/signUpAndSingIn.css';
import iconsChange from '../assets/icons/icons-changes.png';
import swal from 'sweetalert';
import '../assets/styles/pages/changeName.css';

const ChangeUserName = (props)=> {
    //Context
    let {setCurrentUser} = useContext(AppContext)

     // state
     const [name, setName] = useState("");
     const [password, setPassword] = useState("");
     const setState = [setName, setPassword];
 
     // api
     let API_C_NAME = '/user/changeUsername';
     
     // functions
     const handleOnChange = event => {
         let id = event.target.id;
         let value = event.target.value;
         switch (id) {
             case "name":
                 setName(value)
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
             "name": name,
             "password": password
         };
         
         fetch(API_C_NAME, {
             method: 'PATCH', 
             headers: {
                'content-type': 'application/json',
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '<origin> | *',
                // 'Access-Control-Allow-Origin': 'http://localhost:4000',
                // 'Access-Control-Expose-Headers': 'X-My-Custom-Header, X-Another-Custom-Header',
                // 'Access-Control-Allow-Credentials': 'true | false',
                // 'Access-Control-Allow-Headers': '<field-name>[, <field-name>]*',
                // 'Access-Control-Request-Method': '<method>',
                 authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
             },
             body: JSON.stringify(newUser)
         })
             .then(res => res.json())
             .then(data => {
                //  console.log(data)
                 if(data) {
                     swal(data.Username)
                     setCurrentUser(true)
                    props.history.push("/userProfile")  
                 }else {
                     swal(data.error)
                 }
             })
             .catch(err => swal(err) );
 
         setState.forEach(state => state(""))
     }
 
     return(
         <main className="main-sign-up">
             <div className="div-sign-up">
                 <center><h1>Name Change <img src={iconsChange} alt='icons-change' width='30px'/></h1></center>
                 <form onSubmit={handleOnSubmit}>
                     <div className="mb-3">
                         <label  className="form-label">New Name</label>
                         <input onChange={handleOnChange} type="text" 
                                className="form-control" id="name"
                                maxLength="50"
                                minLength="1" 
                                placeholder="name" value={name} autoComplete="on"/>
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

export default ChangeUserName;
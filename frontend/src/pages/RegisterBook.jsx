import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import iconsChange from '../assets/icons/icons-changes.png';
import swal from 'sweetalert';
import '../assets/styles/pages/registerBook.css';
import iconBook from '../assets/icons/icons-book.png';


const RegisterBook = (props)=> {
        // state
        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [img_url, setImg_Url] = useState("");
        const [format, setFormat] = useState("");
        const [suggest_age, setSuggest_age] = useState("");
        // const [description, setDescription] = useState("");
        const setState = [setTitle, setDescription, setImg_Url, setFormat, setSuggest_age];
    
        // api
        let API_C_EMAIL = '/user/uploadBook';
        
        // functions
        const handleOnChange = event => {
            let id = event.target.id;
            let value = event.target.value;
            switch (id) {
                case "title":
                    setTitle(value)
                    break;
                case "description":
                    setDescription(value)        
                    break;
                case "img_url":
                    setImg_Url(value)        
                    break;
                case "format":
                    setFormat(value)        
                    break;   
                case "Suggest_age":
                    setSuggest_age(value)        
                    break; 
                // case "link_payment":
                //     setLink_payment(value)        
                //     break;
                default:
                    console.error('id does not exist')
                    break;
            };
        };
    
        const handleOnSubmit = event => {
            event.preventDefault();
    
            const newUser = {
                "title": title,
                "description": description,
                "img_url": img_url,
                "format": format,
                "suggest_age": suggest_age,
                // "link_payment": link_payment,
            };
            console.log(newUser)
            fetch(API_C_EMAIL, {
                method: 'POST', 
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
                        swal(data.res)
                       props.history.push("/userProfile")  
                    }else {
                        swal(data.error)
                    }
                })
                .catch(err => swal(err.message) );
    
            // setState.forEach(state => state(""))
        };

    return (
        <main className="main-register">
            <div className="div-register">
                <center><h1>New Book <img src={iconBook} alt="book" width='50px'/></h1></center>
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label  className="form-label">Title</label>
                        <input onChange={handleOnChange} type="text" 
                               className="form-control" id="title"
                               maxLength="50"
                               minLength="1" 
                               placeholder="title" value={title} autoComplete="on"/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Description</label>
                        <input onChange={handleOnChange} type="text" 
                               className="form-control" id="description"
                               maxLength="256"  
                               placeholder="description" value={description} autoComplete="on"/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Image</label>
                        <input onChange={handleOnChange} type="text" 
                               className="form-control" id="img_url" 
                               placeholder="img url" value={img_url} autoComplete="on"/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Format</label>
                        <input onChange={handleOnChange} type="text" 
                               className="form-control" id="format"
                               maxLength="50"
                               minLength="1" 
                               placeholder="format type" value={format} autoComplete="on"/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Suggest Age</label>
                        <input onChange={handleOnChange} type="text" 
                               className="form-control" id="Suggest_age"
                               maxLength="256"  
                               placeholder="Age" value={suggest_age} autoComplete="on"/>
                    </div>
                    {/* <div className="mb-5">
                        <label  className="form-label">Password</label>
                        <input onChange={handleOnChange} type="password" 
                               className="form-control" id="password"
                               maxLength="8"
                               minLength="8"  
                               placeholder="passsword" value={password} autoComplete="on"/>
                    </div> */}
                    <div className="mb-4">
                        <button className="btn form-control" type="submit">Submit</button>
                    </div>
                    <div className="mb-3">
                        <center>Go back!!! <Link to="/userProfile">Profile</Link></center> 
                    </div>
                </form>
            </div>
        </main>
    );
};

export default RegisterBook;
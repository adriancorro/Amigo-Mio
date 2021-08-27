import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../context/AppContext';
import iconUser from '../assets/icons/icons-user.png';
import iconApproval from '../assets/icons/icons-approval.png';
import iconsChanges from '../assets/icons/icons-changes.png';
import iconsBook from '../assets/icons/icons-book.png'
import { Link } from 'react-router-dom';
import '../assets/styles/pages/userProfile.css'

const UserProfile = ()=> {
    // context
    let {isAdmin, setIsAdmin} = useContext(AppContext);

    // state
    let [dataUser, setDataUser] = useState(null);

    // Api
    let API_USER = '/user/userProfile';
    // let API_ALL_USERS = 'http://localhost:4000/user/allusers';

    useEffect(()=> {
        fetch(API_USER, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setDataUser(data[0])
                setIsAdmin(data[0].is_admin)

            })
            .catch(err => console.error(err))
    }, []); 
    // console.log(isAdmin)

    return (
        <div className='profile-container'>
            <center><h1>Welcome to Amigo Mio</h1></center>
            {
                dataUser ? (
                    <div className='profile-container_user'>
                        <div>
                            <h3><img src={iconUser} alt="icon-user" width='30px' /> { dataUser.name}</h3>
                        </div>
                        <div>
                            <h5>User {dataUser.is_admin ? 'admin' : 'regular'}</h5>
                        </div>
                    </div>
                ) : ( null )
            }
            <center><hr width='800'/></center> 
            <main className='main-container'>
                <center>
                    <section className='main-cotainer_section'>
                        <h2>Register new book</h2>
                        <Link className='main-cotainer_section_img' to='/registerBook'><img src={iconsBook} alt="icons-book" width='150px' /></Link>
                    </section>
                    {
                        isAdmin ? (
                            <section className='main-cotainer_section'>
                                <h2>Approve books</h2>
                                <Link className='main-cotainer_section_img' to='/approveBooks'><img src={iconApproval}      alt="icons-book" width='150px' /></Link>
                             </section>
                        ) : null
                    }
                    <hr  width='600'/>
                    <section className='main-cotainer_section_change'>
                        <h3>Chance in your profile <img src={iconsChanges} alt="icons-changes" width='70px' /></h3>
                        <ul>
                            <li><Link className='main-cotainer_section_change_link' to='/changeUserName'>changeName</Link></li>
                            <li><Link className='main-cotainer_section_change_link' to='/changeUserEmail'>changeEmail</Link></li>
                            <li><Link className='main-cotainer_section_change_link' to='/changeUserPassword'>changePassword</Link></li>
                        </ul>
                    </section>
                </center>
            </main>
        </div>
    )
};

export default UserProfile;
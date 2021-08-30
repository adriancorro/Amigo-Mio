import {useState, useEffect, useContext} from 'react';
import { AppContext } from '../context/AppContext';

const useInicitialState = () => {
    //state
    let [allbooks, setAllBooks] = useState([]);

    // api
    let API = "/user/allbooks";

    // context
    // let {setAllBooks} = useContext(AppContext);

    useEffect(()=> {
        fetch(API)
            .then(res => res.json())
            .then(data => setAllBooks(data))
            .catch(err => console.error(err));
    }, []);
    // console.log(initial)
    return allBooks
};

export default useInicitialState;
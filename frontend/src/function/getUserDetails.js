
// Authorization": "Bearer" 

const getUserDetails= ()  => new Promise(function(resolve) {   
  let API_USER = '/user/userProfile';
  fetch(API_USER, {
      method: 'Get',
      headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
      }
  })
      .then(res => res.json())
      .then(data => {resolve(data); console.log(data)})
      .catch(err => console.error(err)) 
  })
  
  
  export default getUserDetails;
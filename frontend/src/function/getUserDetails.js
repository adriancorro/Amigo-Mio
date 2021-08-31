
// Authorization": "Bearer"

const getUserDetails= (email)  => new Promise(function(resolve) {   
  let API_USER = `/user/userProfile/${email}`;
  fetch(API_USER)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => console.error(err)) 
  })
  
  
  export default getUserDetails;
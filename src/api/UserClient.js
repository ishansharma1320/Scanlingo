import { apiURL } from '@env'
const getUserData = (token) =>{
    return fetch(`${apiURL}/api/user`,{
          method: 'GET',
          headers: {
            authorizationToken: token
          }
        });
}


const createUserData = (token, body) =>{
    return fetch(`${apiURL}/api/user`,{
          method: 'POST',
          headers: {
            authorizationToken: token,
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(body)
        });
}

const updateUserData = (token,body) =>{
    return fetch(`${apiURL}/api/user`,{
          method: 'PUT',
          headers: {
            authorizationToken: token,
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(body)
        });
}


export {getUserData, createUserData,updateUserData};
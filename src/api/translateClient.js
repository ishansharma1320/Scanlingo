import { apiURL } from '@env'

const translateText = (token, body) =>{
    return fetch(`${apiURL}/api/translate/text`,{
          method: 'POST',
          headers: {
            authorizationToken: token,
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(body)
        });
}


const getSupportedLanguages = (token) =>{
    return fetch(`${apiURL}/api/translate/languages`,{
          method: 'GET',
          headers: {
            authorizationToken: token,
            
          },
          
        });
}


export {translateText, getSupportedLanguages};
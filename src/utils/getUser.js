
import { fetchSearchUser } from "../api/api";
export const getUser = async () => {

    const token =  localStorage.getItem('token');
  
    if(token) {
        const [header, payload, signature] = token.split('.');
            
    const decodedPayload = JSON.parse(atob(payload));
     
     
    const {usuario} = await fetchSearchUser('usuario', 'GET', decodedPayload.id);
    
    
    return usuario;
    }
    
    return null

    }
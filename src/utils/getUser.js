
import { fetchSearchUser } from "../api/api";
export const getUser = async () => {

    const token =  localStorage.getItem('token');
    
    const [header, payload, signature] = token.split('.');
    
    const decodedPayload = JSON.parse(atob(payload));
     
     
    const user = await fetchSearchUser('usuario', 'GET', decodedPayload.id);
    return user;
    
    }
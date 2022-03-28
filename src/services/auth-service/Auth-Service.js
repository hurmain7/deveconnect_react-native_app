import axios from "axios";

class HTTPService {
    
    
    Get = async ( url )  => {
        return await axios.get(url);
 
     }
     Post = async ( url, body, params )  => {
       return await axios.post(url, body, params);

    } 
    Delete = async (url) => {
        return await axios.delete(url)        
    }

}

export class AuthenticationService extends HTTPService {
    registerUser = async (data) => {
        const { body, params } = data;
        try {
            const response = await this.Post('https://devconnecti.herokuapp.com/api/users', body, params )
            return response.data.token;
        }
        catch (error) {
            throw error;
        }
    }

    loginUser = async (data) => {
        const { body, params } = data;
        try {
            const response = await this.Post('https://devconnecti.herokuapp.com/api/auth', body, params )
            return response.data.token;
        } catch (error) {
            throw error;
        }
    }


    authenticatedUser = async (token) => {
        if(token) {
            // console.log('token',token);
            axios.defaults.headers.common['x-auth-token'] = token;
            try {
                const response = await this.Get('https://devconnecti.herokuapp.com/api/auth')
                return response.data;
            } catch (error) {
                throw error;
            }
        }
        else {
            delete axios.defaults.headers.common['x-auth-token'];
        }
        
    }
    

    removeUser = async () => {
        try {
         await this.Delete('https://devconnecti.herokuapp.com/api/profile') 
             
        } catch (error) {
            throw error;   
        }
    }

}

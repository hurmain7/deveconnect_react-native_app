import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { HTTPService } from '../auth-service/Auth-Service';

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

export class ProfileServices extends HTTPService {
    getAuthenticatedUserProfile = async (token) => {
        axios.defaults.headers.common['x-auth-token'] = token;

        try {
            const response = await this.Get('https://devconnecti.herokuapp.com/api/profile/me')
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }

    createProfile = async (data,token) => {
            // axios.defaults.headers.common['x-auth-token'] = token;

            const { body, params } = data;
        try {
            const response = await this.Post('https://devconnecti.herokuapp.com/api/profile', body, params )
            return response.data;
        } catch (error) {
            throw error;
        }
    
    }


    getAllProfiles = async () => {

    try {
        const response = await this.Get('https://devconnecti.herokuapp.com/api/profile')
        return response.data;
    } catch (error) {
        throw error;
    }
    }

    getProfileBYID = async (id) => {
        try {
            const response = await this.Get(`https://devconnecti.herokuapp.com/api/profile/user/${id}`)
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }

    githubRepos = async (userName) => {
        try {
            const response = await this.Get(`https://devconnecti.herokuapp.com/api/profile/github/${userName}`);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }

}
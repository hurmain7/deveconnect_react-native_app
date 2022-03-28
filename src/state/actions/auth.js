import axios from "axios";
import {
    AUTHENTICATED_USER_ATTEMPT,
    AUTHENTICATED_USER_SUCCESS,
    AUTHENTICATED_USER_FAIL,
    REGISTER_USER_ATTEMPT, 
    REGISTER_USER_SUCCESS, 
    REGISTER_USER_FAIL,
    LOGOUT_USER_ATTEMPT,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    LOGIN_USER_ATTEMPT,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REMOVE_USER_ATTEMPT,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_FAIL,
    SET_ERROR,
    CLEAR_AUTH_USERPROFILE


} from '../action-types/types';
import { params } from "../../constants/navigation-routes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import setAuthToken from "../../utils/setAuthToken";
import { AuthenticationService } from '../../services/auth-service/Auth-Service';
import * as RootNavigation from '../../navigation/RootNavigation';


const AuthService = new AuthenticationService ();

export const loadAuthenticatedUser = () => async dispatch => {
    dispatch({ type: AUTHENTICATED_USER_ATTEMPT })
    const token = await AsyncStorage.getItem('token');
    if(token){
        try {
            const user = await AuthService.authenticatedUser(token);
            dispatch({ type: AUTHENTICATED_USER_SUCCESS, payload: user})
        } catch (error) {
            if(error.response) {
                AsyncStorage.removeItem('token')
                Alert.alert('Server Error')
                dispatch({ type: AUTHENTICATED_USER_FAIL })                 // logged out
              }
             else if (error.request) {
                AsyncStorage.removeItem('token')
                Alert.alert('Network Error')
                dispatch({ type: AUTHENTICATED_USER_FAIL })
            }
        }
    }
}

export const register = ({ name, email, password }) => async dispatch => {    
    dispatch({ type: REGISTER_USER_ATTEMPT })
    const body = JSON.stringify({ name, email, password })
    const data = {  body, params }
    try {
        const token = await AuthService.registerUser(data)
        await AsyncStorage.setItem('token', token)
        await dispatch(loadAuthenticatedUser());
        dispatch({ type: REGISTER_USER_SUCCESS, payload: token })
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            if(errors) {
                let msg = errors.map(error => error.msg)
                dispatch({ type: REGISTER_USER_FAIL, payload: msg})
            }
        } else if (err.request) {
            dispatch({ type: SET_ERROR, payload: ['Network Error'] })}
    }
}


export const login = ({ email, password }) => async dispatch => {

    dispatch({ type: LOGIN_USER_ATTEMPT })
    const body = JSON.stringify({ email, password })
    const data = {  body, params }
    try {
        const token = await AuthService.loginUser(data)
        await AsyncStorage.setItem('token', token)
        await dispatch(loadAuthenticatedUser());
        dispatch({ type: LOGIN_USER_SUCCESS, payload: token })

    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            if(errors) {
                let msg = errors.map(error => error.msg)
                dispatch({ type: LOGIN_USER_FAIL, payload: msg})
            }
            
        } else if (err.request) {
            console.log(err.request);
            dispatch({ type: SET_ERROR, payload: ['Network Error'] })
          }
    }
}

export const logoutUser = () => async dispatch => {
        dispatch({ type: LOGOUT_USER_ATTEMPT })
        try {
            await AsyncStorage.removeItem('token')
            dispatch({ type: CLEAR_AUTH_USERPROFILE })
            dispatch({ type: LOGOUT_USER_SUCCESS })   
        } catch (error) {
            if(error.response){
                Alert.alert('Server Error')
                dispatch({ type: LOGOUT_USER_FAIL })
            }
            else if (error.request) {
                Alert.alert('Network Error')
                dispatch({ type: LOGOUT_USER_FAIL })
              }    
        }        
    }


export const removeUser = () => async dispatch => {
    dispatch({ type: REMOVE_USER_ATTEMPT })
    try {
        await AuthService.removeUser();
        await AsyncStorage.removeItem('token')
        dispatch({ type: CLEAR_AUTH_USERPROFILE })
        dispatch({ type: REMOVE_USER_SUCCESS })

    } catch (error) {
        if(error.response){
            Alert.alert('Server Error')
            dispatch({ type: REMOVE_USER_FAIL })
        }
        else if (error.request) {
            Alert.alert('Network Error')
            dispatch({ type: REMOVE_USER_FAIL })
          }
    }
}




// export const removeUser = () => async dispatch => {
//      await AsyncStorage.removeItem('token');

//      try {
//         const res = axios.delete('http://192.168.13.185:5000/api/profile')
//         dispatch({ type: USER_REMOVE_SUCCESS })
//         dispatch({ type: CLEAR_PROFILE })
//         Alert.alert( 'Account Removed Successfully')
//     } catch (err) {
//         const errors = err.response.data.errors;
//         console.log(errors);
//         dispatch({ type: USER_REMOVE_FAIL})
//     }

// }
import { Alert } from 'react-native';
import { 
    GET_AUTH_USERPROFILE_ATTEMPT, 
    GET_AUTH_USERPROFILE_SUCCESS, 
    GET_AUTH_USERPROFILE_FAIL, 
    CREATE_PROFILE_ATTEMPT,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAIL,
    GET_PROFILES_DATA_ATTEMPT,
    GET_PROFILES_DATA_SUCCESS,
    GET_PROFILES_DATA_FAIL,
    GET_PROFILE_BYID_ATTEMPT,
    GET_PROFILE_BYID_SUCCESS,
    GET_PROFILE_BYID_FAIL,
    GET_GITHUB_REPOS_ATTEMPT,
    GET_GITHUB_REPOS_SUCCESS,
    GET_GITHUB_REPOS_FAIL,
    LOAD_MORE_PROFILES_ATTEMPT,
    LOAD_MORE_PROFILES_SUCCESS,
    LOAD_MORE_PROFILES_FAIL,
    RESET_PAGE,
    LOAD_INITIAL_PROFILES_ATTEMPT,
    LOAD_INITIAL_PROFILES_SUCCESS,
    LOAD_INITIAL_PROFILES_FAIL,
    SET_ERROR

} from "../action-types/types";
import { params } from "../../constants/navigation-routes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileServices } from "../../services/profile-service/Profile-Service";
import { userEmail } from "../selectors/auth";
import * as RootNavigation from '../../navigation/RootNavigation';
import { ROUTES } from '../../constants/navigation-routes';

const ProfileService = new ProfileServices();

export const getAuthUserProfile = () => async dispatch => {
    dispatch({ type: GET_AUTH_USERPROFILE_ATTEMPT })
    const token = await AsyncStorage.getItem('token');
    try {
        const profile = await ProfileService.getAuthenticatedUserProfile(token);
        dispatch({ type: GET_AUTH_USERPROFILE_SUCCESS, payload: profile });        
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            if(errors) {
                let msg = errors.map(error => error.msg)
                dispatch({ type: GET_AUTH_USERPROFILE_FAIL, payload: msg })
            }
        } else if (err.request) {
            dispatch({ type: SET_ERROR, payload: ['Network Error'] })}
    }   
}

export const createProfile = ( { formData, update=false } ) => async dispatch => {
    dispatch({ type: CREATE_PROFILE_ATTEMPT })
    // const token = await AsyncStorage.getItem('token')
    try {
        const body = formData;
        const data = { body, params}
        const profile = await ProfileService.createProfile(data);
        dispatch({ type: CREATE_PROFILE_SUCCESS, payload: profile})
        await dispatch(getAuthUserProfile())
        await dispatch(getProfileData());
        if(update){
            RootNavigation.navigate(ROUTES.DASHBOARD, { update: 'updated'})
        }
        else{
            RootNavigation.navigate(ROUTES.DASHBOARD, { create: 'created'})
        }
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            if(errors) {
                let msg = errors.map(error => error.msg)
                dispatch({ type: CREATE_PROFILE_FAIL, payload: msg })
            }
        } else if (err.request) {
            dispatch({ type: SET_ERROR, payload: ['Network Error'] })}
    }

}

export const getProfileData = () => async dispatch => {
    dispatch({ type: GET_PROFILES_DATA_ATTEMPT })
    try {
        const profiles = await ProfileService.getAllProfiles();
        // console.log(profiles);
        dispatch({ type: GET_PROFILES_DATA_SUCCESS, payload: profiles });        
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            if(errors) {
                let msg = errors.map(error => error.msg)
                dispatch({ type: GET_PROFILES_DATA_FAIL, payload: msg})
            }
        } else if (err.request) {
            dispatch({ type: SET_ERROR, payload: ['Network Error'] })}
    }   
}

export const getProfileById = (id, githubusername) => async dispatch => {
    // console.log('usernamss', githubusername);
    dispatch({ type: GET_PROFILE_BYID_ATTEMPT })
    try {
        const profile = await ProfileService.getProfileBYID(id);
        // console.log('profile',profile[0]);
        dispatch({ type: GET_PROFILE_BYID_SUCCESS, payload: profile[0] });
        await dispatch(getGithubRepos(githubusername));
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            if(errors) {
                let msg = errors.map(error => error.msg)
                dispatch({ type: GET_PROFILE_BYID_FAIL, payload: msg})
            }
        } else if (err.request) {
            dispatch({ type: SET_ERROR, payload: ['Network Error'] })}
    }   
}


export const getGithubRepos = (userName) => async dispatch => {
    // console.log('as',userName);
    dispatch({ type: GET_GITHUB_REPOS_ATTEMPT })
    try {
        const repos = await ProfileService.githubRepos(userName);
        dispatch({ type: GET_GITHUB_REPOS_SUCCESS, payload: repos });        
    } catch (err) {
        if (err.response) {
                dispatch({ type: GET_GITHUB_REPOS_FAIL})
        } else if (err.request) {
            dispatch({ type: SET_ERROR, payload: ['Network Error'] })}
    }   
}

export const resetPage = () => dispatch => {
    dispatch({type: RESET_PAGE})

}

export const loadInitialProfiles = () => async dispatch => {
    await dispatch({ type: LOAD_INITIAL_PROFILES_ATTEMPT })
    try {
    await    dispatch({ type: LOAD_INITIAL_PROFILES_SUCCESS })
        
    } catch (error) {
        dispatch({ type: LOAD_INITIAL_PROFILES_FAIL, payload: 'Cannot Load Initial Profiles'})
    }
}

export const loadMoreProfiles = () =>  (dispatch) => {
    dispatch({ type: LOAD_MORE_PROFILES_ATTEMPT })
    try {
         dispatch({ type: LOAD_MORE_PROFILES_SUCCESS })
    } catch (error) {
        dispatch({ type: LOAD_MORE_PROFILES_FAIL, payload: 'Cannot Load More Profiles'})       
    }
}
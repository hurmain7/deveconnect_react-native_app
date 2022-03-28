import {
    AUTHENTICATED_USER_ATTEMPT,
    AUTHENTICATED_USER_SUCCESS,
    AUTHENTICATED_USER_FAIL,
    LOGIN_USER_ATTEMPT,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_ATTEMPT, 
    REGISTER_USER_SUCCESS, 
    REGISTER_USER_FAIL, 
    LOGOUT_USER_ATTEMPT,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    SET_ERROR,
    REMOVE_ERROR,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_ATTEMPT,
    REMOVE_USER_FAIL



} from '../action-types/types';


const INITIAL_STATE = {
    token : null,
    isAuthenticated: null,
    isRequestSent: false,
    isLoading: false,
    user: null,
    data: [],
    errorMsg: []
}

 const AuthReducer = ( state = INITIAL_STATE, action ) => {
    const { type, payload } = action;

    switch (type) {

        case AUTHENTICATED_USER_ATTEMPT: {
            return {
                ...state,
                isRequestSent: true,
                isLoading: true,
            }
        }

        case AUTHENTICATED_USER_SUCCESS: {
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                isRequestSent: false,
                isLoading: false,
                errorMsg: []
            };
        }

        case LOGIN_USER_ATTEMPT:
        case REGISTER_USER_ATTEMPT: {
            return {
                ...state,
                isLoading: true,
                isRequestSent: true,
                errorMsg: [],
                data: [],
                

            }
        }
        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                isRequestSent: false,
                isLoading: false,
                errorMsg: []
            };
        }

        case LOGIN_USER_FAIL: 
        case REGISTER_USER_FAIL:
        {   
            
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isRequestSent: false,
                user: null,
                isLoading: false,
                errorMsg: [...state.errorMsg, ...payload]
            }
        }

        case REMOVE_USER_ATTEMPT:
        case LOGOUT_USER_ATTEMPT: {
            return {
                ...state,
                isRequestSent: true,
                isLoading: true,
                error: [],
                data: []
            }
        }

        case AUTHENTICATED_USER_FAIL:
        case REMOVE_USER_SUCCESS:
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                isRequestSent: false,
                user: null,
                errorMsg: [],
                data: []
            }
        }
        case REMOVE_USER_FAIL:
        case LOGOUT_USER_FAIL:
        {
            return {
                ...state,
                isRequestSent: false,
                isLoading: false,
                errorMsg: []
            }
        }
        
        case SET_ERROR: {
            return {
                ...state,
                isRequestSent: false,
                isLoading: false,
                errorMsg: payload
            }
        }
        case REMOVE_ERROR: {
            return {
                ...state,
                errorMsg: []
            }
        }

        default: {
            return state;
        }
    }
};

export { AuthReducer };

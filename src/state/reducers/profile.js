import { 
    GET_AUTH_USERPROFILE_ATTEMPT, 
    GET_AUTH_USERPROFILE_SUCCESS, 
    GET_AUTH_USERPROFILE_FAIL, 
    CLEAR_AUTH_USERPROFILE, 
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
    LOAD_MORE_PROFILES,
    RESET_PAGE,
    LOAD_MORE_PROFILES_ATTEMPT,
    LOAD_INITIAL_PROFILES_ATTEMPT,
    LOAD_INITIAL_PROFILES_SUCCESS,
    LOAD_INITIAL_PROFILES_FAIL,
    LOAD_MORE_PROFILES_SUCCESS,
    LOAD_MORE_PROFILES_FAIL,
    SET_ERROR,
    REMOVE_ERROR

} from "../action-types/types";

const INITIAL_STATE = {
    
    authUserProfile: null,
    profile: null,
    isRequestSent: false,
    isLoading: false,
    isRefreshing: false,
    page: 1,
    perPage: 3,
    totalProfiles: [],
    errorMsg: [],
    reposData: [],

}

const ProfileReducer = ( state = INITIAL_STATE, action ) => {
    const { type, payload } = action;

    switch(type){
        case GET_GITHUB_REPOS_ATTEMPT:
        case GET_AUTH_USERPROFILE_ATTEMPT: {
            return {
                ...state,
                isLoading: true,
                isRequestSent: true
            }
        }

        case CREATE_PROFILE_ATTEMPT: {
            return {
                ...state,
                isLoading: true,
                isRequestSent: true,
                reposData: [],
                profile: null,
                errorMsg: []
            }
        }
        
        case CREATE_PROFILE_SUCCESS:
        case GET_AUTH_USERPROFILE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isRequestSent: false,
                authUserProfile: payload,
                errorMsg: []
            }
        }

        case CREATE_PROFILE_FAIL:
        case GET_AUTH_USERPROFILE_FAIL: {
            return {
                ...state,
                isLoading: false,
                isRequestSent: false,
                errorMsg: payload
            }
        }

        case CLEAR_AUTH_USERPROFILE: {
            return {
                ...state,
                authUserProfile: null,
                profile: null,
                isRequestSent: false,
                isLoading: false,
                isRefreshing: false,
                page: 1,
                perPage: 3,
                totalProfiles: [],
                errorMsg: [],
                reposData: [],
            }
        }


        case GET_PROFILES_DATA_ATTEMPT: {
            return {
                ...state,
                isRequestSent: true,
                isLoading: true,
                isRefreshing: false,
                page: 1,
                perPage: 3,
                totalProfiles: [],
                errorMsg: [],
                reposData: [],
            }
        }


        case GET_PROFILES_DATA_SUCCESS: {
            return {
                ...state,
                isRequestSent: false,
                isLoading: false,
                isRefreshing: false,
                page: 1,
                perPage: 3,
                totalProfiles: payload,
                errorMsg: [],
                reposData: [],
            }
        }

        
        case GET_PROFILES_DATA_FAIL: {
            return {
                ...state,
                authUserProfile: null,
                isRequestSent: false,
                isLoading: false,
                isRefreshing: false,
                page: 1,
                perPage: 3,
                totalProfiles: [],
                errorMsg: [...state.errorMsg, payload],
                reposData: [],
            }
        }


        case GET_PROFILE_BYID_ATTEMPT: {
            return {
                ...state,
                isRequestSent: true,
                isLoading: true,
            }
        }

        case GET_PROFILE_BYID_SUCCESS: {
            return {
                ...state,
                isRequestSent: false,
                isLoading: false,
                page: 1,
                perPage: 3,
                profile: payload,
                errorMsg: [],
            }
        }

        case GET_PROFILE_BYID_FAIL: {
            return {
                ...state,
                isRequestSent: false,
                isLoading: false,
                page: 1,
                perPage: 3,
                profile: [],
                errorMsg: [...state.errorMsg, payload],

            }
        }

        
        case GET_GITHUB_REPOS_SUCCESS: {
            return {
                ...state,
                isRequestSent: false,
                isLoading: false,
                page: 1,
                perPage: 3,
                reposData: payload,
                errorMsg: [],

            }
        }

        
        case GET_GITHUB_REPOS_FAIL: {
            return {
                ...state,
                isRequestSent: false,
                isLoading: false,
                page: 1,
                perPage: 3,
                reposData: [],
                errorMsg: [],

            }
        }

        case LOAD_INITIAL_PROFILES_ATTEMPT: {
            return {
                ...state,
                isRequestSent: true,
                isLoading: true,
                isRefreshing: true
            }
        }

        
        case LOAD_INITIAL_PROFILES_SUCCESS: {
            return {
                ...state,
                isRequestSent: false,
                isLoading: false,
                isRefreshing: false,
                page: 1,
                perPage: 3,
                errorMsg: []
            }
        }

        case LOAD_INITIAL_PROFILES_FAIL: {
            return {
                ...state,
                isRequestSent: false,
                isLoading: false,
                isRefreshing: false,
                errorMsg: [payload]
            }
        }

        case LOAD_MORE_PROFILES: {
        
            return {
                ...state,
                page: state.page +1,
            }
        }

        case LOAD_MORE_PROFILES_ATTEMPT: {
            return {
                ...state,
                isLoading: true,
                isRequestSent: true,
            }
        }
        
        
        case LOAD_MORE_PROFILES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isRequestSent: false,
                page: state.page + 1
            }
        }

        
        case LOAD_MORE_PROFILES_FAIL: {
            return {
                ...state,
                isLoading: true,
                isRequestSent: true,
                errorMsg: [payload]
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

        // case RESET_PAGE: {
        
        //     return {
        //         ...state,
        //         page: 1,


        //     }
        // }
        
      

        // case GET_PROFILE: 
        //     return {
        //         ...state,
        //         profile: payload,
        //         loading: false,
        //         error: []
        //     }

        // case PROFILE_ERROR:
        //     return {
        //         ...state,
        //         error: [...state.error,payload],
        //         loading: false,
        //     };

        // case CLEAR_PROFILE: {
        //     return {
        //         ...state,
        //         loading: true,
        //         profile: null,
        //         error: [],
        //         repos: []
        //     }
        // }

        // case PROFILE_LOADING: {
        //     return {
        //         ...state,
        //         loading: true
        //     }
        // }
        
        default: 
            return state;
        

    }
}

export {ProfileReducer}
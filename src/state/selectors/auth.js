
const baseSelector = (state) => state.Auth;

export const getError = (state) => baseSelector(state).errorMsg
// export const getToken = (state) => baseSelector(state).token
export const getUser = (state) => baseSelector(state).user
export const isAuthenticated = (state) => baseSelector(state).isAuthenticated
export const getLoading = (state) => baseSelector(state).isLoading

// export const imageSource = (state) => {
//     const user = getUser(state)
//     const url = user.avatar
//     return url;
// }

export const userEmail = (state) => {
    const user = getUser(state)
    const email = user.email
    return email;
}

export const userImageUrl = (state) => {
    const user = getUser(state)
    const url = user.avatar
    return url;
}

// export const getState = (state) => baseSelector(state)

// import get from 'lodash.get';
// import isEmpty from 'lodash.isempty';

// const baseSelector = (state) => state.dummy;

// // export const getDummyData = (state) => get(baseSelector(state), 'data', null);

// export const getDummyData = (state) => baseSelector(state).data;

// export const getDummyLoadingState = (state) => baseSelector(state).isLoading;

// export const isValid = (state) => {
//     const data = getDummyData(state);
//     const isLoading = getDummyLoadingState(state);
//     return (!isLoading && isEmpty(data));
// }

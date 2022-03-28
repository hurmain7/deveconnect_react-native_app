
const baseSelector = (state) => state.profile;

export const getAuthProfile = (state) => baseSelector(state).authUserProfile;
// export const getError = (state) => baseSelector(state).error;
export const profileLoading = (state) => baseSelector(state).isLoading;
// export const getLoading = (state) => baseSelector(state).loading;
export const totalProfiles = (state) => baseSelector(state).totalProfiles
export const profileById = (state) => baseSelector(state).profile;
export const getProfileError = (state) => baseSelector(state).errorMsg
export const getReposData = (state) => baseSelector(state).reposData
export const getPerPage = (state) => baseSelector(state).perPage
export const currentPage = (state) => baseSelector(state).page
export const getError = (state) => baseSelector(state).errorMsg

export const getTotalProfilesLength = (state) => {
    const totalProfilesLength = totalProfiles(state).length
    return totalProfilesLength;
}

export const getAuthProfileId = (state) => {
    const profile = getAuthProfile(state)
    if(profile){
        const { user } = profile
        const {_id } = user;
        return _id
    }     
}

export const getAuthProfileGithub = (state) => {
    const profile = getAuthProfile(state)
    if(profile){
        const { githubusername } = profile
        return githubusername;
    }     
}
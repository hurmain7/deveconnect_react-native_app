import { SET_ERROR, REMOVE_ERROR } from "../action-types/types"

export const setError = (error) => dispatch => {
    dispatch({ type: SET_ERROR, payload: error
    })

}

export const removeError = () => async dispatch => {
    dispatch({ type: REMOVE_ERROR})
}

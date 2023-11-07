import { SET_SEARCH } from "../action-types/ACTION_TYPES";

export const setSearch = (search) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: SET_SEARCH,
                payload: search
            })
        } catch (error) {
            throw new Error(error.message);
        }
        
    }
}
import { SET_CURRENT_PAGE } from "../action-types/ACTION_TYPES";

export const setCurrentPage = (pageNumber) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: SET_CURRENT_PAGE,
                payload: pageNumber
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
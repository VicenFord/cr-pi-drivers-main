import {SET_PAGES_PAGINATION} from '../action-types/ACTION_TYPES'

export const setPagesPagination = (pagesPagination) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: SET_PAGES_PAGINATION,
                payload: pagesPagination
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
import { CLEAR_CREATE_MESSAGE } from "../action-types/ACTION_TYPES";

export const clearCreateMessage = () => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: CLEAR_CREATE_MESSAGE,
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
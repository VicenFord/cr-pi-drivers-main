import { CLEAN_DRIVER_DETAIL } from "../action-types/ACTION_TYPES";

export const cleanDriverDetail = () => {
    return async (dispatch) => {

        try {
            return dispatch({
                type: CLEAN_DRIVER_DETAIL,
            })

        } catch (error) {
            throw new Error(error.message);
        }
    }
}
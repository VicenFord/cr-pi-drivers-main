import { CLEAN_DRIVERS_BY_NAME } from "../action-types/ACTION_TYPES";

export const cleanDriversByName = () => {
    return async (dispatch) => {

        try {
            return dispatch({
                type: CLEAN_DRIVERS_BY_NAME,
            })

        } catch (error) {
            throw new Error(error.message);
        }
    }
}
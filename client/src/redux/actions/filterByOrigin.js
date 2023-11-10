import { FILTER_DRIVERS_BY_ORIGIN } from "../action-types/ACTION_TYPES";

export const filterByOrigin = (origin) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: FILTER_DRIVERS_BY_ORIGIN,
                payload: origin
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
import { ORDER_DRIVERS_BY_BIRTHDATE } from "../action-types/ACTION_TYPES";

export const orderByDOB = (dob) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: ORDER_DRIVERS_BY_BIRTHDATE,
                payload: dob
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
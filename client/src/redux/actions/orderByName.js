import { ORDER_DRIVERS_BY_NAME } from "../action-types/ACTION_TYPES";

export const orderByName = (order) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: ORDER_DRIVERS_BY_NAME,
                payload: order
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
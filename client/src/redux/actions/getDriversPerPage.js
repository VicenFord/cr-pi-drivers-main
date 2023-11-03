import { GET_DRIVERS_PER_PAGE } from "../action-types/ACTION_TYPES";

export const getDriversPerPage = (page) => {
    return async (dispatch) => {
        try {            
            return dispatch({
                type: GET_DRIVERS_PER_PAGE,
                payload: page
            })

        } catch (error) {
            throw new Error(error.message);        
        }
    }

    
}
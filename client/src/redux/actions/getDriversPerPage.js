import axios from "axios";
import { GET_DRIVERS_PER_PAGE } from "../action-types/ACTION_TYPES";

export const getDriversPerPage = (page) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/drivers?page=${page}`)
            
            return dispatch({
                type: GET_DRIVERS_PER_PAGE,
                payload: data
            })

        } catch (error) {
            throw new Error(error.message);        
        }
    }

    
}
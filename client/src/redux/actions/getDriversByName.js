import axios from 'axios';
import { GET_DRIVERS_BY_NAME } from '../action-types/ACTION_TYPES';

export const getDriversByName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/drivers?name=${name}`)
            
            return dispatch({
                type: GET_DRIVERS_BY_NAME,
                payload: data
            })
            
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
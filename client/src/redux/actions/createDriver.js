import axios from 'axios';
import { CREATE_DRIVER } from '../action-types/ACTION_TYPES';

export const createDriver = (driver) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3001/drivers', driver)
            return dispatch({
                type: CREATE_DRIVER,
                payload: data
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
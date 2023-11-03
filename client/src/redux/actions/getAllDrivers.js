import axios from 'axios';
import { GET_ALL_DRIVERS } from '../action-types/ACTION_TYPES';

export const getAllDrivers = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3001/drivers')
            return dispatch({
                type: GET_ALL_DRIVERS,
                payload: data
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
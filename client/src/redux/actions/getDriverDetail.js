import axios from 'axios';
import { GET_DRIVER_DETAIL } from '../action-types/ACTION_TYPES';

export const getDriverDetail = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/drivers/${id}`)
            
            return dispatch({
                type: GET_DRIVER_DETAIL,
                payload: data
            })
            
        } catch (error) {
            console.log('llega el id', id);
            throw new Error(error.message);
        }
    }
}
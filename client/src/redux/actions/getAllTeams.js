import axios from "axios";
import { GET_ALL_TEAMS } from "../action-types/ACTION_TYPES";

export const getAllTeams = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3001/teams')
            return dispatch({
                type: GET_ALL_TEAMS,
                payload: data?.map(item => item.name)
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
import { FILTER_DRIVERS_BY_TEAMS } from "../action-types/ACTION_TYPES";

export const filterByTeam = (team) => {
    console.log(team);
    return async (dispatch) => {
        try {
            return dispatch({
                type: FILTER_DRIVERS_BY_TEAMS,
                payload: team
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
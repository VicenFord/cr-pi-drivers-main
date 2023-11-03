import { FILTER_DRIVERS_BY_TEAMS } from "../action-types/ACTION_TYPES";

export const filterDriversByTeams = (teams) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: FILTER_DRIVERS_BY_TEAMS,
                payload: teams
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
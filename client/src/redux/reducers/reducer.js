import { GET_ALL_DRIVERS, GET_DRIVERS_PER_PAGE, GET_DRIVERS_BY_NAME,
GET_DRIVER_DETAIL, CLEAN_DRIVER_DETAIL, CLEAN_DRIVERS_BY_NAME, FILTER_DRIVERS_BY_TEAMS, FILTER_DRIVERS_BY_ORIGIN,
ORDER_DRIVERS_BY_NAME, ORDER_DRIVERS_BY_BIRTHDATE} from "../action-types/ACTION_TYPES";

const initialState = {
    allDrivers: [],
    filteredDriversByName: [],
    driversPerPage: [],
    driverDetail: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case GET_ALL_DRIVERS:
            return {...state, allDrivers: action.payload};

        case GET_DRIVERS_BY_NAME:
            return {...state, filteredDriversByName: action.payload};

        case CLEAN_DRIVERS_BY_NAME:
            return {...state, filteredDriversByName: []};

        case GET_DRIVER_DETAIL:
            return {...state, driverDetail: action.payload};

        case CLEAN_DRIVER_DETAIL:
            return {...state, driverDetail: {}};

        case GET_DRIVERS_PER_PAGE:
            return {...state, driversPerPage: action.payload?.driversPerPage};

        case FILTER_DRIVERS_BY_TEAMS:
            return {
                ...state,
                driversPerPage: [],//Logica para filtrar por teams
                filteredDriversByName: []//Logica para filtrar por teams
            }

        default:
            return {...state};
    }
}

export default reducer;
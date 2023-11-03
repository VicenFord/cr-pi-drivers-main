import { GET_ALL_DRIVERS, GET_DRIVERS_PER_PAGE, GET_DRIVERS_BY_NAME,
GET_DRIVER_DETAIL, CLEAN_DRIVER_DETAIL, CLEAN_DRIVERS_BY_NAME, FILTER_DRIVERS_BY_TEAMS, FILTER_DRIVERS_BY_ORIGIN,
ORDER_DRIVERS_BY_NAME, ORDER_DRIVERS_BY_BIRTHDATE, SET_CURRENT_PAGE} from "../action-types/ACTION_TYPES";

const initialState = {
    allDrivers: [],
    filteredDriversByName: [],
    driverDetail: {},
    currentPage: 1,
    totalPages: null,
    driversPerPage: [],
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
            const pageNumber = action.payload
            const limit = 9 //drivers per page
            const startIndex = (pageNumber - 1) * limit
            const endIndex = pageNumber * limit

            return {
                ...state,
                currentPage: action.payload,
                driversPerPage: state.allDrivers?.slice(startIndex, endIndex),
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }

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
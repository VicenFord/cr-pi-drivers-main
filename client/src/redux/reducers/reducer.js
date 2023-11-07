import { GET_ALL_DRIVERS, GET_DRIVERS_PER_PAGE, GET_DRIVERS_BY_NAME,
GET_DRIVER_DETAIL, CLEAN_DRIVER_DETAIL, CLEAN_DRIVERS_BY_NAME, FILTER_DRIVERS_BY_TEAMS, FILTER_DRIVERS_BY_ORIGIN,
ORDER_DRIVERS_BY_NAME, ORDER_DRIVERS_BY_BIRTHDATE, SET_CURRENT_PAGE, SET_SEARCH, SET_PAGES_PAGINATION} from "../action-types/ACTION_TYPES";

const initialState = {
    allDrivers: [],
    filteredDriversByName: [],
    resultsPerPage: [],
    driverDetail: {},
    currentPage: 1,
    pagesPagination: null,
    driversPerPage: [],
    search: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case GET_ALL_DRIVERS:
            return {...state, allDrivers: action.payload};

        case GET_DRIVERS_BY_NAME:
            const pageNum = action.payload
            const lim = 9 //drivers per page
            const startInd = (pageNum - 1) * lim
            const endInd = pageNum * lim

            return {
                ...state,
                filteredDriversByName: action.payload,
                resultsPerPage: state.filteredDriversByName?.slice(startInd, endInd),
                currentPage: 1,
                pagesPagination: Math.ceil(state.filteredDriversByName?.length / lim),
                driversPerPage: state.filteredDriversByName?.length > 0 ? state.resultsPerPage : []
            };

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
                resultsPerPage: state.filteredDriversByName?.slice(startIndex, endIndex)
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }

        case SET_SEARCH:
            return {
                ...state,
                search: action.payload
            }

        case SET_PAGES_PAGINATION:
            return {
                ...state,
                pagesPagination: action.payload
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
import { GET_ALL_DRIVERS, GET_DRIVERS_PER_PAGE, GET_DRIVERS_BY_NAME,
GET_DRIVER_DETAIL, CLEAN_DRIVER_DETAIL, CLEAN_DRIVERS_BY_NAME, FILTER_DRIVERS_BY_TEAMS, FILTER_DRIVERS_BY_ORIGIN,
ORDER_DRIVERS_BY_NAME, ORDER_DRIVERS_BY_BIRTHDATE, SET_CURRENT_PAGE, SET_SEARCH, SET_PAGES_PAGINATION, GET_ALL_TEAMS,
CREATE_DRIVER, CLEAR_CREATE_MESSAGE} from "../action-types/ACTION_TYPES";

const initialState = {
    allDrivers: [],
    allDriversBackUp: [],
    allDriversFiltered: [],
    filteredDriversByName: [],
    filteredDriversByTeam: [],
    filteredDriversByOrigin: [],
    filtersTeamPerPage: [],
    filtersOriginPerPage: [],
    combinatedFilterDrivers: [],
    resultsPerPage: [],
    driverDetail: {},
    currentPage: 1,
    pagesPagination: null,
    driversPerPage: [],
    search: '',
    allTeams: [],
    createDriverMessage: null,
    filterTeamValue: 'all',
    filterOriginValue: 'all',
    filterNameValue: 'none',
    filterDOBValue: 'noneDOB'
}

const reducer = (state = initialState, action) => {

    function objetosRepetidos(array1, array2) {
        return array1.filter(objeto1 =>
          array2.some(objeto2 =>
            JSON.stringify(objeto1) === JSON.stringify(objeto2)
          )
        );
      }


    switch (action.type) {
        
        case GET_ALL_DRIVERS:
            return {
                ...state,
                allDrivers: action.payload,
                allDriversFiltered: [...state.allDrivers]
            }


        case GET_ALL_TEAMS:
            return {...state, allTeams: action.payload};

        case CREATE_DRIVER:
            return {...state, createDriverMessage: action.payload};

        case CLEAR_CREATE_MESSAGE:
            return {...state, createDriverMessage: null};

        case GET_DRIVERS_BY_NAME:
            const pageNum = action.payload
            const lim = 9 //drivers per page
            const startInd = (pageNum - 1) * lim
            const endInd = pageNum * lim

            
            return {
                ...state,
                allDriversFiltered: objetosRepetidos(state.allDrivers, action.payload),
                resultsPerPage: [...action.payload]?.slice(startInd, endInd),
                currentPage: 1,
                pagesPagination: Math.ceil(state.allDrivers?.length / lim),
                driversPerPage: state.allDrivers?.length > 0 ? state.resultsPerPage : [],
            };

        case CLEAN_DRIVERS_BY_NAME:
            return {...state, allDriversFiltered: [...state.allDrivers]};

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
                resultsPerPage: state.allDriversFiltered?.slice(startIndex, endIndex),
                filtersTeamPerPage: state.filteredDriversByTeam?.slice(startIndex, endIndex),
                filtersOriginPerPage: state.filteredDriversByOrigin?.slice(startIndex, endIndex),
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
            if(action.payload==='all'){
                return {
                    ...state,
                    allDriversFiltered: [...state.allDrivers],
                    filterTeamValue: action.payload,
                    currentPage: 1
                }
            }

            return {
                ...state,
                allDriversFiltered: objetosRepetidos([...state.allDrivers], [...state.allDrivers].filter(driver => {
                  if (driver.Teams) {
                    if (Array.isArray(driver.Teams)) {
                      return driver.Teams.includes(action.payload);
                    } else if (typeof driver.Teams === 'string') {
                      return driver.teams.includes(action.payload);
                    }
                  } else if (driver.teams) {
                    if (Array.isArray(driver.teams)) {
                      return driver.teams.includes(action.payload);
                    } else if (typeof driver.teams === 'string') {
                      return driver.teams.includes(action.payload);
                    }
                  }
                  return false;
                })),
                filterTeamValue: action.payload,
                currentPage: 1

              }
        
        case FILTER_DRIVERS_BY_ORIGIN:

            if(action.payload==='all'){
                return {
                    ...state,
                    allDriversFiltered: [...state.allDrivers],
                    filterOriginValue: action.payload,
                    currentPage: 1

                }
            }

            if(action.payload==='db'){
                return{
                    ...state,
                    allDriversFiltered: objetosRepetidos([...state.allDrivers], [...state.allDriversFiltered].length === 0 ? [...state.allDrivers].filter(driver => {
                        if(driver.hasOwnProperty('Teams')){
                            return driver
                        }
                        return false;
                    }) : [...state.allDriversFiltered].filter(driver => {
                        if(driver.hasOwnProperty('Teams')){
                            return driver
                        }
                        return false;
                    })),
                    filterOriginValue: action.payload,
                    currentPage: 1

                }
            }

            if(action.payload==='api'){
                return{
                    ...state,
                    allDriversFiltered: objetosRepetidos([...state.allDrivers], [...state.allDriversFiltered].length === 0 ? [...state.allDrivers].filter(driver => {
                        if(driver.hasOwnProperty('teams')){
                            return driver
                        }
                        return false;
                    }) : [...state.allDriversFiltered].filter(driver => {
                        if(driver.hasOwnProperty('teams')){
                            return driver
                        }
                        return false;
                    })),
                    filterOriginValue: action.payload,
                    currentPage: 1

                }
            }

            case ORDER_DRIVERS_BY_NAME:
                const sortedArrayByName = (arr) => {
                    return arr.sort((a, b) => {
                        const nameA = typeof a.name === 'string' ? a.name : a.name.forename;
                        const nameB = typeof b.name === 'string' ? b.name : b.name.forename;
                        return nameA.localeCompare(nameB);
                      });
                }

                const sortedArrayByID = (arr) => {
                    return arr.sort((a, b) => {
                        const idA = typeof a.id === 'number' ? a.id : a.id;
                        const idB = typeof b.id === 'number' ? b.id : b.id;
                        return idA - idB;
                    })
                }

                if(action.payload==='none'){
                    return {
                        ...state,
                        allDriversFiltered: [...sortedArrayByID(state.allDriversFiltered)],
                        allDrivers: [...sortedArrayByID(state.allDrivers)],
                        filteredDriversByName: [...sortedArrayByID(state.filteredDriversByName)],
                        filteredDriversByTeam: [...sortedArrayByID(state.filteredDriversByTeam)],
                        filteredDriversByOrigin: [...sortedArrayByID(state.filteredDriversByOrigin)],
                        filterNameValue: action.payload,
                        currentPage: 1

                    }
                }

                if(action.payload==='asc'){
                    return {
                        ...state,
                        allDriversFiltered: [...sortedArrayByName(state.allDriversFiltered)],
                        allDrivers: [...sortedArrayByName(state.allDrivers)],
                        filteredDriversByName: [...sortedArrayByName(state.filteredDriversByName)],
                        filteredDriversByTeam: [...sortedArrayByName(state.filteredDriversByTeam)],
                        filteredDriversByOrigin: [...sortedArrayByName(state.filteredDriversByOrigin)],
                        filterNameValue: action.payload,
                        currentPage: 1

                    }
                }

                if(action.payload==='desc'){
                    return {
                        ...state,
                        allDriversFiltered: [...sortedArrayByName(state.allDriversFiltered).reverse()],
                        allDrivers: [...sortedArrayByName(state.allDrivers).reverse()],
                        filteredDriversByName: [...sortedArrayByName(state.filteredDriversByName).reverse()],
                        filteredDriversByTeam: [...sortedArrayByName(state.filteredDriversByTeam).reverse()],
                        filteredDriversByOrigin: [...sortedArrayByName(state.filteredDriversByOrigin).reverse()],
                        filterNameValue: action.payload,
                        currentPage: 1

                    }
                }

            case ORDER_DRIVERS_BY_BIRTHDATE:
                const sortedArrayByDOB = (arr) => {
                    return arr.sort((a, b) => {
                        const dateA = a.dob || a.birthDate;
                        const dateB = b.dob || b.birthDate;
                    
                        return new Date(dateA) - new Date(dateB);
                      });
                }
                const sortedArrayById = (arr) => {
                    return arr.sort((a, b) => {
                        const idA = typeof a.id === 'number' ? a.id : a.id;
                        const idB = typeof b.id === 'number' ? b.id : b.id;
                        return idA - idB;
                    })
                }

                if(action.payload==='noneDOB'){
                    return {
                        ...state,
                        allDriversFiltered: [...sortedArrayById(state.allDriversFiltered)],
                        allDrivers: [...sortedArrayById(state.allDrivers)],
                        filteredDriversByName: [...sortedArrayById(state.filteredDriversByName)],
                        filteredDriversByTeam: [...sortedArrayById(state.filteredDriversByTeam)],
                        filteredDriversByOrigin: [...sortedArrayById(state.filteredDriversByOrigin)],
                        filterDOBValue: action.payload,
                        currentPage: 1

                    }
                }

                if(action.payload==='asc'){
                    return {
                        ...state,
                        allDriversFiltered: [...sortedArrayByDOB(state.allDriversFiltered)],
                        allDrivers: [...sortedArrayByDOB(state.allDrivers)],
                        filteredDriversByName: [...sortedArrayByDOB(state.filteredDriversByName)],
                        filteredDriversByTeam: [...sortedArrayByDOB(state.filteredDriversByTeam)],
                        filteredDriversByOrigin: [...sortedArrayByDOB(state.filteredDriversByOrigin)],
                        filterDOBValue: action.payload,
                        currentPage: 1

                    }
                }

                if(action.payload==='desc'){
                    return {
                        ...state,
                        allDriversFiltered: [...sortedArrayByDOB(state.allDriversFiltered).reverse()],
                        allDrivers: [...sortedArrayByDOB(state.allDrivers).reverse()],
                        filteredDriversByName: [...sortedArrayByDOB(state.filteredDriversByName).reverse()],
                        filteredDriversByTeam: [...sortedArrayByDOB(state.filteredDriversByTeam).reverse()],
                        filteredDriversByOrigin: [...sortedArrayByDOB(state.filteredDriversByOrigin).reverse()],
                        filterDOBValue: action.payload,
                        currentPage: 1
                    }
                }
                

        default:
            return {...state};
    }
}

export default reducer;
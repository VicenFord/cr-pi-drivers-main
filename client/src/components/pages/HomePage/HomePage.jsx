import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './homePage.css'
import Card from '../../Card/Card'
import SearchBar from '../../SearchBar/SearchBar';
import Pagination from '../../Pagination/Pagination';
import { getAllDrivers } from '../../../redux/actions/getAllDrivers';
import { getDriversPerPage } from '../../../redux/actions/getDriversPerPage';
import { Link } from 'react-router-dom';
import Filters from '../../Filters/Filters';

const HomePage = () => {
    const dispatch = useDispatch();
    
    const allDrivers = useSelector(state => state.allDrivers);
    const allDriversFiltered = useSelector(state => state.allDriversFiltered);
    const filteredDriversByName = useSelector(state => state.filteredDriversByName);
    const filteredDriversByTeam = useSelector(state => state.filteredDriversByTeam);
    const filteredDriversByOrigin = useSelector(state => state.filteredDriversByOrigin);
    const resultsPerPage = useSelector(state => state.resultsPerPage);
    const currentPage = useSelector(state => state.currentPage);


    useEffect(() => {
        if (allDrivers.length === 0 ) {
          dispatch(getAllDrivers());
        } else {
          dispatch(getDriversPerPage(currentPage));
        }

      }, [allDrivers, filteredDriversByName, filteredDriversByTeam, filteredDriversByOrigin, allDriversFiltered]);


    return (
        <div id='container'>

            <SearchBar />

            <Link to='/create'>Crea un driver</Link>

            <Filters />


                {allDriversFiltered?.length > 0 ?
                
                <div id="cardsContainer">
                    {
                    resultsPerPage?.map((driver) => {
                        return (
                            <Card key={driver.id} driver={driver} />
                        )})
                    }
                </div>                

                :

                <h1>There are no drivers available</h1>
            
            }
            
            <Pagination />
            
        </div>
    )
}

export default HomePage
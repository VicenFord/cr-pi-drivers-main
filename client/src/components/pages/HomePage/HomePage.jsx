import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './homePage.css'
import Card from '../../Card/Card'
import SearchBar from '../../SearchBar/SearchBar';
import Pagination from '../../Pagination/Pagination';
import { getAllDrivers } from '../../../redux/actions/getAllDrivers';
import { getDriversPerPage } from '../../../redux/actions/getDriversPerPage';

const HomePage = () => {
    const dispatch = useDispatch();
    
    const allDrivers = useSelector(state => state.allDrivers);
    const driversPerPage = useSelector(state => state.driversPerPage);
    const filteredDriversByName = useSelector(state => state.filteredDriversByName);
    const currentPage = useSelector(state => state.currentPage);


    useEffect(() => {
        if (allDrivers.length === 0) {
          dispatch(getAllDrivers());
        } else {
          dispatch(getDriversPerPage(currentPage));
        }
      }, [allDrivers]);


    return (
        <div id='container'>

            <SearchBar />


                {filteredDriversByName?.length > 0 ?
                
                <div id="cardsContainer">
                    {
                    filteredDriversByName?.map((driver) => {
                        return (
                            <Card key={driver.id} driver={driver} />
                        )})
                    }
                </div>

                :

                driversPerPage?.length > 0 ? 
                
                <div id="cardsContainer">
                    {
                    driversPerPage?.map((driver) => {
                        return (
                            <Card key={driver.id} driver={driver} />
                        )})
                    }
                </div>
                

                :

                <h1>There are no drivers available</h1>
            
            }
            
            {filteredDriversByName?.length === 0 && <Pagination />}
            
        </div>
    )
}

export default HomePage
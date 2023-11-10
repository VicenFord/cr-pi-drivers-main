import React, { useEffect, useState } from 'react'
import './pagination.css'
import { getDriversPerPage } from '../../redux/actions/getDriversPerPage'
import { getAllDrivers } from '../../redux/actions/getAllDrivers'
import { setCurrentPage } from '../../redux/actions/setCurrentPage'
import { useDispatch, useSelector } from 'react-redux';
import { setPagesPagination } from '../../redux/actions/setPagesPagination';


const Pagination = () => {
    const dispatch = useDispatch()
    const allDrivers = useSelector(state => state.allDrivers);
    const allDriversFiltered = useSelector(state => state.allDriversFiltered);
    const filteredDriversByName = useSelector(state => state.filteredDriversByName);
    const filteredDriversByTeam = useSelector(state => state.filteredDriversByTeam);
    const filteredDriversByOrigin = useSelector(state => state.filteredDriversByOrigin);
    const filtersOriginPerPage = useSelector(state => state.filtersOriginPerPage);
    const resultsPerPage = useSelector(state => state.resultsPerPage);
    const pagesPagination = useSelector(state => state.pagesPagination);
    const currentPage = useSelector(state => state.currentPage);

    let pag = []
    for (let i = 1; i <= pagesPagination; i++) {
        pag.push(i)
    }

    const getTotalPages = async () => {
        try {
            if(allDriversFiltered?.length > 0) {
                return dispatch(setPagesPagination(Math.ceil(allDriversFiltered?.length / 9)))
            }
            return dispatch(setPagesPagination(Math.ceil(allDrivers.length / 9)))
        } catch (error) {
            throw new Error(error.message);            
        }        
    }

   const handleChange = (event) => {
        dispatch(setCurrentPage(parseInt(event.target.value)))
        dispatch(getDriversPerPage(event.target.value))
   }

   const handlePrevPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(parseInt(currentPage) - 1))
            dispatch(getDriversPerPage(parseInt(currentPage) - 1))
        }
   }

   const handleNextPage = () => {
        if (parseInt(currentPage) < parseInt(pagesPagination)) {
            dispatch(setCurrentPage(parseInt(currentPage) + 1))
            dispatch(getDriversPerPage(parseInt(currentPage) + 1))
        }
   }

    useEffect(() => {
        if (allDrivers.length === 0) {
            dispatch(getAllDrivers());
        }else{
            getTotalPages();
            dispatch(getDriversPerPage(currentPage))
        }
    }, [allDrivers])

    useEffect(() => {
       getTotalPages();
    }, [filteredDriversByTeam, filteredDriversByOrigin, allDriversFiltered])



  return (
    <div className='buttonContainer'>
        <button className={parseInt(currentPage) === 1 ? 'buttonPagination disabled' : 'buttonPagination'} onClick={handlePrevPage}><i className="fas fa-arrow-left"></i> Prev</button>
        {pag.map((page) => { 
            return (
                <button className={parseInt(currentPage) === page ? 'buttonPagination active' : 'buttonPagination'} key={page} onClick={handleChange} value={page}>{page}</button>
            )
            })}
        <button className={parseInt(currentPage) === parseInt(pagesPagination) ? 'buttonPagination disabled' : 'buttonPagination'} onClick={handleNextPage}>Next <i className="fas fa-arrow-right"></i></button>
    </div>
  )
}

export default Pagination
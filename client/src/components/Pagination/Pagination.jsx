import React, { useEffect, useState } from 'react'
import './pagination.css'
import { getDriversPerPage } from '../../redux/actions/getDriversPerPage'
import { getAllDrivers } from '../../redux/actions/getAllDrivers'
import { setCurrentPage } from '../../redux/actions/setCurrentPage'
import { useDispatch, useSelector } from 'react-redux';


const Pagination = () => {
    const dispatch = useDispatch()
    const allDrivers = useSelector(state => state.allDrivers);
    const currentPage = useSelector(state => state.currentPage);

    const [totalPages, setTotalPages] = useState(null)

    let pag = []
    for (let i = 1; i <= totalPages; i++) {
        pag.push(i)
    }

    const getTotalPages = async () => {
        try {
            setTotalPages(Math.ceil(allDrivers.length / 9))
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
        if (parseInt(currentPage) < parseInt(totalPages)) {
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



  return (
    <div className='buttonContainer'>
        <button className={parseInt(currentPage) === 1 ? 'buttonPagination disabled' : 'buttonPagination'} onClick={handlePrevPage}><i className="fas fa-arrow-left"></i> Prev</button>
        {pag.map((page) => { 
            return (
                <button className={parseInt(currentPage) === page ? 'buttonPagination active' : 'buttonPagination'} key={page} onClick={handleChange} value={page}>{page}</button>
            )
            })}
        <button className={parseInt(currentPage) === parseInt(totalPages) ? 'buttonPagination disabled' : 'buttonPagination'} onClick={handleNextPage}>Next <i className="fas fa-arrow-right"></i></button>
    </div>
  )
}

export default Pagination
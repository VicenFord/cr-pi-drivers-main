import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './pagination.css'
import { getDriversPerPage } from '../../redux/actions/getDriversPerPage'
import { useDispatch } from 'react-redux';


const Pagination = () => {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    let pag = []
    for (let i = 1; i <= totalPages; i++) {
        pag.push(i)
    }

    const getTotalPages = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/drivers?page=1')
            setTotalPages(data.totalPages);
            
        } catch (error) {
            throw new Error(error.message);            
        }        
    }

   const handleChange = (event) => {
        setCurrentPage(event.target.value);
        dispatch(getDriversPerPage(event.target.value))
   }

   const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(parseInt(currentPage) - 1)
            dispatch(getDriversPerPage(parseInt(currentPage) - 1))
        }
   }

   const handleNextPage = () => {
        if (parseInt(currentPage) < parseInt(totalPages)) {
            setCurrentPage(parseInt(currentPage) + 1)
            dispatch(getDriversPerPage(parseInt(currentPage) + 1))
        }
   }

    useEffect(() => {
        dispatch(getDriversPerPage(currentPage))
        getTotalPages();
    }, [])



  return (
    <div className='buttonContainer'>
        <button className={parseInt(currentPage) === 1 ? 'buttonPagination disabled' : 'buttonPagination'} onClick={handlePrevPage}><i class="fas fa-arrow-left"></i> Prev</button>
        {pag.map((page) => { 
            return (
                <button className={parseInt(currentPage) === page ? 'buttonPagination active' : 'buttonPagination'} key={page} onClick={handleChange} value={page}>{page}</button>
            )
            })}
        <button className={parseInt(currentPage) === parseInt(totalPages) ? 'buttonPagination disabled' : 'buttonPagination'} onClick={handleNextPage}>Next <i class="fas fa-arrow-right"></i></button>
    </div>
  )
}

export default Pagination
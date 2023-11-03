import React, { useState } from 'react'
import './searchBar.css'
import { useDispatch } from 'react-redux';
import { getDriversByName } from '../../redux/actions/getDriversByName';
import { getDriversPerPage } from '../../redux/actions/getDriversPerPage';
import { cleanDriversByName } from '../../redux/actions/cleanDriversByName';
import useDebounce from '../../customHooks/useDebounce';


const SearchBar = () => {
    const dispatch = useDispatch();

    const [driversByName, setDriversByName] = useState('');

    const updateDebounceTextSearch = useDebounce((driversByName) => {
        if (driversByName === '') {
            dispatch(cleanDriversByName());
            return dispatch(getDriversPerPage(1));
        }
        dispatch(getDriversByName(driversByName));
    }, 750); // Uso mi coustomhook, si no cambia nada el valor del inupt en 750 milisegundos ahi recien hago la call, sino no.
    const handleChange = (event) => {
        setDriversByName(event.target.value);
        updateDebounceTextSearch(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(driversByName.length === 0) {
            dispatch(cleanDriversByName());
            return dispatch(getDriversPerPage(1));
        }
        return dispatch(getDriversByName(driversByName));
    }

  return (
    <div className="wrap">
    <div className="search">
        <input value={driversByName} onChange={handleChange} type="text" className="searchTerm" placeholder="Search any driver you want..."/>
        <button type="submit" className="searchButton" onClick={handleSubmit}>
            <i className="fas fa-search"></i>
        </button>
    </div>
    </div>
  )
}

export default SearchBar
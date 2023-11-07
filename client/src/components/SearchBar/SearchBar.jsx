import React  from 'react'
import './searchBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { getDriversByName } from '../../redux/actions/getDriversByName';
import { getDriversPerPage } from '../../redux/actions/getDriversPerPage';
import { cleanDriversByName } from '../../redux/actions/cleanDriversByName';
import { setSearch } from '../../redux/actions/setSearch';
import useDebounce from '../../customHooks/useDebounce';


const SearchBar = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector(state => state.search);

    const updateDebounceTextSearch = useDebounce((searchValue) => {
        if (searchValue === '') {
            dispatch(setSearch(''));
            dispatch(cleanDriversByName());
            return dispatch(getDriversPerPage(1));
        }
        dispatch(setSearch(searchValue));
        dispatch(getDriversByName(searchValue));
    }, 750); // Uso mi coustomhook, si no cambia nada el valor del inupt en 750 milisegundos ahi recien hago la call, sino no.
    const handleChange = (event) => {
        dispatch(setSearch(event.target.value));
        updateDebounceTextSearch(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchValue.length === 0) {
            dispatch(setSearch(''));
            dispatch(cleanDriversByName());
            return dispatch(getDriversPerPage(1));
        }
        dispatch(setSearch(searchValue));
        return dispatch(getDriversByName(searchValue));
    }

  return (
    <div className="wrap">
    <div className="search">
        <input value={searchValue} onChange={handleChange} type="text" className="searchTerm" placeholder="Search any driver you want..."/>
        <button type="submit" className="searchButton" onClick={handleSubmit}>
            <i className="fas fa-search"></i>
        </button>
    </div>
    </div>
  )
}

export default SearchBar
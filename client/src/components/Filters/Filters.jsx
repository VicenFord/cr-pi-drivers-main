import React, { useEffect } from 'react'
import './filter.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTeams } from '../../redux/actions/getAllTeams';
import { filterByTeam } from '../../redux/actions/filterByTeam';
import { filterByOrigin } from '../../redux/actions/filterByOrigin';
import { orderByName } from '../../redux/actions/orderByName';
import { orderByDOB } from '../../redux/actions/orderByDOB';


const Filters = () => {
  const dispatch = useDispatch();
  const allTeams = useSelector(state => state.allTeams);

  const handleFilterByTeam = (event) => {
    dispatch(filterByTeam(event.target.value))
  }

  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value))
  }

  const handleOrderByName = (event) => {
    dispatch(orderByName(event.target.value))
  }

  const handleOrderByDOB = (event) => {
    dispatch(orderByDOB(event.target.value))
  }

  useEffect(() => {
    if (allTeams?.length === 0) {
        dispatch(getAllTeams())
    }
  }, [allTeams])


  return (
    <div>

      <select name="filterByTeam" id="filterByTeam" onChange={handleFilterByTeam}>
        <option value="all">All Teams</option>
        {allTeams?.map((team, index) => (
          <option key={index} value={team}>{team}</option>
        ))}
      </select>

      <select name="filterByOrigin" id="filterByOrigin" onChange={handleFilterByOrigin}>
        <option value="all">All origins</option>
        <option value="db">Data Base</option>
        <option value="api">API</option>
      </select>

      <select name="orderByName" id="orderByName" onChange={handleOrderByName}>
        <option value="none">None</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <select name="orderByDOB" id="orderByDOB" onChange={handleOrderByDOB}>
        <option value="noneDOB">None</option>
        <option value="desc">Younger</option>
        <option value="asc">Older</option>
      </select>

    </div>
  )
}

export default Filters
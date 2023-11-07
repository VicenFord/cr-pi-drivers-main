import React from 'react'
import './card.css'
import { Link } from 'react-router-dom';
import { getDriverDetail } from '../../redux/actions/getDriverDetail';
import { useDispatch } from 'react-redux';

const Card = ( {driver} ) => {
  const dispatch = useDispatch();
  const { id, name, lastname, image, teams, Teams } = driver;
    
    const teamsDriverDB = Teams?.length!==0 ? `${Teams?.map((team) => `${team} `).join(', ')}` : 'This driver has no teams'; 

  return (
    <Link className='link' to={`/drivers/${id}`} onClick={()=>{dispatch(getDriverDetail(id))}}>
      <div className='cardWrapper'>
          <img src={lastname ? image : image?.url === "" ? `../../../assets/images/placeholderDriver.png` : image?.url} alt={name} />

          <div>
              <h1>{ lastname ? `${name} ${lastname}` : `${name?.forename} ${name?.surname}` }</h1>
              <h3>Teams:</h3>
              <p>{ teams ? `${teams}` : `${teamsDriverDB}` }</p>
          </div>
      </div>
    </Link>
  )
}

export default Card
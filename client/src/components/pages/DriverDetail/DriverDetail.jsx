import React, { useEffect } from 'react'
import './driverDetail.css'
import { useDispatch, useSelector } from 'react-redux';
import { cleanDriverDetail } from '../../../redux/actions/cleanDriverDetail';

const DriverDetail = () => {
    const dispatch = useDispatch();
    const driverDetail = useSelector(state => state.driverDetail);
    const { id, name, lastname, nationality, image, description, birthDate, dob, teams, Teams } = driverDetail;


    useEffect(() => {
        return () => {
            dispatch(cleanDriverDetail()) //Cleaning driver detail when component unmount
        }
    }, [])
    

  return (
    <div className="detailContainer">
        <div className='detailWrapper'>
                
            <img src={lastname ? image : image?.url === "" ? `../../../assets/images/placeholderDriver.png` : image?.url} alt={name} />

            <div className='cardBody'>
                <h1>{ lastname ? `${name} ${lastname}` : `${name?.forename} ${name?.surname}` }</h1>
                <div className='infoDriver'>
                    <h3>ID: {id}</h3>
                    <h3>Birthdate: { dob ? `${dob}` : `${birthDate}`}</h3>
                    <h3>Nationality: {nationality}</h3>
                    <h3>Description: {description}</h3>
                    <h3>Teams: { teams ? `${teams}` : Teams?.length !== 0 ? `${Teams}` : `This driver does not have any teams`}</h3>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default DriverDetail
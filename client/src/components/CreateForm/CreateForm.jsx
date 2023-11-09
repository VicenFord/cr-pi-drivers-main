import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeams } from '../../redux/actions/getAllTeams';
import { validation } from './validation';
import { createDriver } from '../../redux/actions/createDriver';
import {clearCreateMessage} from '../../redux/actions/clearCreateMessage';
import './createForm.css'

const CreateForm = () => {
    const dispatch = useDispatch()
    const allTeams = useSelector(state => state.allTeams);
    const createDriverMessage = useSelector(state => state.createDriverMessage);

    const [driverInfo, setDriverInfo] = useState({
        name: '',
        lastname: '',
        nationality: '',
        image: '',
        birthDate: '',
        description: '',
        teams: [],
    })

    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        setDriverInfo({
            ...driverInfo,
            [event.target.name]: event.target.value.trim()
        })
    }

    const handleChangeTeam = (event) => {
        if(event.target.value === '') {
            return setDriverInfo({
                ...driverInfo,
                teams: []
            })
        }
        return setDriverInfo({
            ...driverInfo,
            teams: event.target.value.split(',').map(item => item.trim())
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createDriver(driverInfo))
        setDriverInfo({
            name: '',
            lastname: '',
            nationality: '',
            image: '',
            birthDate: '',
            description: '',
            teams: [],
        })
    }

    useEffect(() => {
        if (allTeams?.length === 0) {
            dispatch(getAllTeams())
        }
    }, [allTeams])

    useEffect(() => {
        setErrors(validation(driverInfo))

        return () => {
            dispatch(clearCreateMessage())
        }
    }, [driverInfo])

  return (
    <div id="contForm">
        <div className="containerForm">
        <div className="brand-logo" />
        <div className="brand-title">CREATE YOUR DRIVER</div>
        <form className="inputs">
            <label htmlFor='name'>First Name*</label>
            {errors.name && <p className="error"> - {errors.name}</p>}
            <input type="text" name='name' onChange={handleChange} value={driverInfo.name} placeholder="First name..." />
            
            <label htmlFor='lastname'>Last Name*</label>
            {errors.lastname && <p className="error"> - {errors.lastname}</p>}
            <input type="text" name='lastname' onChange={handleChange} value={driverInfo.lastname} placeholder="Lastname..." />
            
            <label htmlFor='nationality'>Nationality*</label>
            {errors.nationality && <p className="error"> - {errors.nationality}</p>}
            <input type="text" name='nationality' onChange={handleChange} value={driverInfo.nationality} placeholder="Enter nationality..." />
            
            <label htmlFor='image'>Image</label>
            <input type='url' name='image' onChange={handleChange} value={driverInfo.image} placeholder="Enter image URL..." />
            
            <label htmlFor='birthDate'>Date of Birth*</label>
            {errors.birthDate && <p className="error"> - {errors.birthDate}</p>}
            <input type="date" name='birthDate' onChange={handleChange} value={driverInfo.birthDate} id='birthDate' />
            
            <label htmlFor='description'>Description*</label>
            {errors.description && <p className="error"> - {errors.description}</p>}
            <textarea name='description' onChange={handleChange} value={driverInfo.description} placeholder="Enter a description..." />
            
            <label htmlFor="teams" className="con-tooltip right">
                Teams (Hover to see)
                    {errors.teams && <p className="error"> - {errors.teams}</p>}
                <div className="tooltip">
                    {allTeams?.map((team) => (
                        <span key={team} className="tooltiptext">{team}</span>
                    ))}
                </div>
            </label>
            <input type="text" name='teams' onChange={handleChangeTeam} value={driverInfo.teams} placeholder="Optional. Separate teams with a comma..." />
            
            <button type="submit" className={Object.keys(errors).length > 0 && 'disabled'} onClick={handleSubmit} disabled={Object.keys(errors).length > 0} >CREATE</button>

            {createDriverMessage !== null &&
            <>
                <p className="success">{createDriverMessage?.ok}</p>
                <p className={createDriverMessage?.message[0]==='T' ? 'success red' : 'success'}>{createDriverMessage?.message}</p>
            </>}
        </form>
        </div>
    </div>
  )
}

export default CreateForm
import React, { useState } from 'react'
import './createForm.css'

const CreateForm = () => {

    const [data, setData] = useState({
        name: '',
        lastname: '',
        nationality: '',
        image: '',
        birthDate: '',
        description: '',
        teams: ''
    })

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(data)
    }


  return (
    <div id="contForm">
        <div className="containerForm">
        <div className="brand-logo" />
        <div className="brand-title">CREATE YOUR DRIVER</div>
        <form className="inputs">
            <label htmlFor='name'>First Name*</label>
            <input type="text" name='name' onChange={handleChange} placeholder="First name..." />
            
            <label htmlFor='lastname'>Last Name*</label>
            <input type="text" name='lastname' onChange={handleChange} placeholder="Lastname..." />
            
            <label htmlFor='nationality'>Nationality*</label>
            <input type="text" name='nationality' onChange={handleChange} placeholder="Enter nationality..." />
            
            <label htmlFor='image'>Image</label>
            <input type="text" name='image' onChange={handleChange} placeholder="Enter image URL..." />
            
            <label htmlFor='birthDate'>Date of Birth*</label>
            <input type="date" name='birthDate' onChange={handleChange} id='birthDate' />
            
            <label htmlFor='description'>Description*</label>
            <textarea name='description' onChange={handleChange} placeholder="Enter a description..." />
            
            <label htmlFor='teams'>Teams</label>
            <input type="text" name='teams' onChange={handleChange} placeholder="Enter none, one o more teams..." />
            
            <button type="submit">CREATE</button>
        </form>
        </div>
    </div>
  )
}

export default CreateForm
const axios = require("axios");
require("dotenv").config();
const { DB_HOST, API_PORT } = process.env;
const { Driver } = require('../../db');


const getAllDrivers = async (req, res) => {
    try {
        const { data } = await axios(`http://${DB_HOST}:${API_PORT}/drivers`);
        const driversDB = await Driver.findAll();

        return [...driversDB, ...data];
        
    } catch (error) {
        res.status(500).json({ message: error.message })        
    }
}



module.exports = getAllDrivers;
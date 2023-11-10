const axios = require("axios");
require("dotenv").config();
const { DB_HOST, API_PORT } = process.env;
const { Driver, Team } = require('../../db');


const getAllDrivers = async (req, res) => {
    try {
        const { data } = await axios(`http://${DB_HOST}:${API_PORT}/drivers`);
        const driversDB = await Driver.findAll({
            include: {
                model: Team,
                attributes: ['name'],
                through: { attributes: [] }
            }
        });

        if(driversDB){
            const driversDBwithTeams = driversDB.map(driverDB => {
                return {
                    ...driverDB.dataValues,
                    Teams: driverDB.Teams.map((team) => team.name)
                }
            })

            return [ ...data,...driversDBwithTeams];
        }

        return [...data, ...driversDB];
        
    } catch (error) {
        res.status(500).json({ message: error.message })        
    }
}



module.exports = getAllDrivers;
const axios = require("axios");
require("dotenv").config();
const { DB_HOST, API_PORT } = process.env;
const { Driver, Team } = require('../../db');


const getDriversPerPage = async (page) => {
    try {
        const pageNumber = Number(page) || 1;
        const limit = 9 //drivers per page
        const startIndex = (pageNumber - 1) * limit
        const endIndex = pageNumber * limit


        const { data } = await axios(`http://${DB_HOST}:${API_PORT}/drivers`);
        const driversDB = await Driver.findAll({
            include: {
                model: Team,
                attributes: ['name'],
                through: { attributes: [] }
            }
        });
        const driversDBWithCleanTeams = driversDB.map(driverDB => {
            return {
                ...driverDB.dataValues,
                Teams: driverDB.Teams.map((team) => team.name)
            }
        })
        const allDrivers = [...driversDBWithCleanTeams, ...data];

        const driversPerPage = allDrivers.slice(startIndex, endIndex);

        return{
            pageNumber,
            totalPages: Math.ceil(allDrivers.length / limit),
            numberOfDrivers: driversPerPage.length,
            driversPerPage
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message })        
    }
}



module.exports = getDriversPerPage;
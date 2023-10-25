const axios = require("axios");
require("dotenv").config();
const { DB_HOST, API_PORT } = process.env;
const { Driver, Team } = require('../../db');

const getDriverByID = async (id) => {
    const idNumber = Number(id); // Returns a number or NaN

    if(!isNaN(idNumber)){ //If id passed can be converted to a number
        try {
            const resultAPI = await axios(`http://${DB_HOST}:${API_PORT}/drivers/${idNumber}`);
            if(resultAPI.data){
                return resultAPI.data;
            }
        } catch (error) {
            return {
                message: error.message,
                error: 'Driver not found in API'
            }
        }
    }

    if(isNaN(idNumber)){ //If id passed cannot be converted to a number (string like UUID)
        try {
            const resultDB = await Driver.findOne({ where: { id },
                include: {
                    model: Team,
                    attributes: ['name'],
                    through: { attributes: [] }
                }});
                
            if (resultDB) {
                const resultDBwithTeams = {
                    ...resultDB.dataValues,
                    Teams: resultDB.Teams.map((team) => team.name)
                };

                return(resultDBwithTeams);
            }

            return {
                message: 'Driver not found in DB'
            }
            
        } catch (error) {
            return {
                message: error.message,
                error: 'Driver not found in DB'
            }
        }
    }
    
}

module.exports = getDriverByID
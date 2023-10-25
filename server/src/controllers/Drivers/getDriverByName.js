const axios = require("axios");
require("dotenv").config();
const { DB_HOST, API_PORT } = process.env;
const { Driver, Team } = require('../../db');
const { Op } = require("sequelize");

const getDriverByName = async (name) => {
    try {
        //Searchs in DB
        const driversDBfound = await Driver.findAll({
            where: {
                [Op.or]: [
                    { 
                        name: { 
                            [Op.iLike]: `%${name}%`
                        }
                    },
                    { 
                        lastname: {
                            [Op.iLike]: `%${name}%`
                        }
                    },
                ]
            },
            include: {
                model: Team,
                attributes: ['name'],
                through: { attributes: [] }
            }
        })
        //Le agrego los Teams a los Drivers de la DB que encontre
        const driversDBfoundWithTeams = driversDBfound?.map(driverDB => {
            return {
                ...driverDB.dataValues,
                Teams: driverDB.Teams.map((team) => team.name)
            }
        });

        //Searchs in API
        const { data } = await axios(`http://${DB_HOST}:${API_PORT}/drivers`);
        const resultAPIfound = data.filter((driver) => {
            return driver.name.forename.toLowerCase().includes(name.toLowerCase()) || driver.name.surname.toLowerCase().includes(name.toLowerCase())
        })

        const allResultsFound = [...driversDBfoundWithTeams, ...resultAPIfound]

        if(allResultsFound.length > 0){
            return allResultsFound.slice(0, 15); //Returns first 15 results
        }

        return {
            message: 'No results found containing the name',
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = getDriverByName;
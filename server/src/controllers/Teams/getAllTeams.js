const axios = require("axios");
require("dotenv").config();
const { DB_HOST, API_PORT } = process.env;
const { Team } = require('../../db');

const getAllTeams = async () => {
    try {
        /* 
        PROCESO PARA OBTENER TODOS LOS TEAMS DE LA API Y GUARDARLO EN LA DB:
        
        const { data } = await axios(`http://${DB_HOST}:${API_PORT}/drivers`);
        const teamsArray = data.map( (driver) => driver?.teams?.split(',').flat());
        const flatedArray = teamsArray.flat();
        const trimmedTeams = flatedArray.map((team) => team?.trim());

        const uniqueAndOrderedTeams = [...new Set(trimmedTeams)].sort( (a, b) => {
            return a.localeCompare(b);
        }).slice(0, -1);

        //Creating all teams in DB
        uniqueAndOrderedTeams.map((team) => {
            Team.findOrCreate({
                where: {
                    name: team
                },
            })
        })
        
        return uniqueAndOrderedTeams; */
        
        const resultTeamsDB = await Team.findAll()
        return resultTeamsDB;

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = getAllTeams;
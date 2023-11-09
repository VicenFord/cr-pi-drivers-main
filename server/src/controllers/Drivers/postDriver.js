const axios = require("axios");
require("dotenv").config();
const { DB_HOST, API_PORT } = process.env;
const { Driver, Team } = require('../../db');
const { Op } = require("sequelize");
const sequelize = require("sequelize");

const postDriver = async ( { name, lastname, description, image, nationality, birthDate, teams} ) => {
    const isURL = (valor) => {
        const RegexURL = /^(?=.*[.:])(?=.*\/).*$/;
        return RegexURL.test(valor);
    }

    //crea validaciones antes de crear al Driver en la base de datos:
    if(!name || !lastname || !description || !nationality || !birthDate) {
        throw new Error('Cannot create, some data is missing');
    }    

    try {
        const newDriver = await Driver.create({ name, lastname, description, image: isURL(image) ? image : 'https://img.freepik.com/premium-photo/formula-one-racing-driver-helmet-before-start-competition-ai-generated_201606-6181.jpg',
        nationality, birthDate });

        /* Explicacion del codigo de abajo: RELACION DRIVER - TEAM:
        Si llega un array llamado 'teams' con valores adentro, busco esos valores en la DB de Teams y agrega una relacion
        entre ese driver y cada team.
        PARA COMPARAR BIEN:
        1) Transformo la columna 'name' de la DB de Teams (todos sus valores) a lowercase con metodos de Sequelize.
        2) Uso [Op.in] para pasarle directamente un array de valores y que me encuentre los Teams que se encuentren dentro de ese array
        3) Transformo a cada valor que me llega en el array, a lowercase y elimino los espacios en blanco asi se compara sin ser 
        case-sesitive y sin importar si tiene espacios en blanco adelante o al final */
        if (teams && teams.length > 0) {

            const teamInstances = await Team.findAll({
                where: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), {
                    [Op.in]: teams.map(team => team.toLowerCase().trim())
                })
              });

            teamInstances?.map(async (team) => {
                await newDriver.addTeam(team);
            })

            const teamsNotFound = teams.filter(team => {
                return !teamInstances.some(Team => Team?.dataValues?.name.toLowerCase() === team.toLowerCase().trim())
            })
        
            if(teamsNotFound.length > 0){
                return{ //Return if teams were sent and some were not in the db
                    ok: 'New driver created successfully!',
                    message: `These teams were not added to the driver because they were not found: '${teamsNotFound.map(team => team?.trim())}'`
                }
            }

            //Return if all teams were in the DB
            return {
                ok: 'New driver created successfully!',
                message: `All teams were added to the driver: ${teamInstances.map(team => team?.dataValues?.name)}`
            };
        }

        //Return if no teams were sent
        return {
            ok: 'New driver created successfully!',
            message: 'No teams were sent'
        }; 
        
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = postDriver;
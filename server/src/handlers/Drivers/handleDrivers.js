const getDriversPerPage = require('../../controllers/Drivers/getDriversPerPage');
const getAllDrivers = require('../../controllers/Drivers/getAllDrivers');
const getDriverByID = require('../../controllers/Drivers/getDriverByID');
const postDriver = require('../../controllers/Drivers/postDriver');
const getDriverByName = require('../../controllers/Drivers/getDriverByName');

const handleGetAllDrivers = async (req, res) => {
    const { id } = req.params
    const { name, page } = req.query
    if (id) return handleGetDriverByID(req, res);
    if (name) return handleGetDriverByName(req, res);
    if (page) return handleGetDriversPerPage(req, res);
    
    try {
        const result = await getAllDrivers();
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const handleGetDriversPerPage = async (req, res) => {
    try {
        const { page } = req.query
        const result = await getDriversPerPage(page);
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const handleGetDriverByID = async (req, res) => {
    try {
        const { id } = req.params
        const result = await getDriverByID(id);
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const handleGetDriverByName = async (req, res) => {
    try {
        const { name } = req.query
        const result = await getDriverByName(name);
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error.message);
    }
}

const handlePostDriver = async (req, res) => {
    try {
        const { name, lastname, description, image, nationality, birthDate, teams } = req.body
        const result = await postDriver({ name, lastname, description, image, nationality, birthDate, teams });
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    handleGetAllDrivers,
    handleGetDriversPerPage,
    handleGetDriverByID,
    handleGetDriverByName,
    handlePostDriver,
}
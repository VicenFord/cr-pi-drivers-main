const getAllTeams = require('../../controllers/Teams/getAllTeams');

const handleGetAllTeams = async (req, res) => {
    try {
        const result = await getAllTeams();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message })        
    }
}


module.exports = {
    handleGetAllTeams,
}
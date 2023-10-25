const { Router } = require("express");
const { handleGetAllDrivers, handleGetDriverByID, handlePostDriver,
handleGetDriverByName, } = require("../handlers/Drivers/handleDrivers");
const { handleGetAllTeams } = require("../handlers/Teams/handleTeams");

const router = Router();
router.get('/drivers', handleGetAllDrivers);
router.get('/drivers/:id', handleGetDriverByID);
router.get('/drivers/?name', handleGetDriverByName)
router.post('/drivers', handlePostDriver);
router.get('/teams', handleGetAllTeams);



module.exports = router;

const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const { BACKEND_PORT } = process.env;

conn.sync({ force: true }).then(() => {
server.listen(BACKEND_PORT, () => {
  console.log(`Server listening on port ${BACKEND_PORT}`);
})
}).catch(error => console.error(error))

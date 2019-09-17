const http = require('http');
const app = require('./src/app.js');
const PORT = process.env.PORT || 8080;
// let password = process.argv[2]
// process.env.PASSWORD = password;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

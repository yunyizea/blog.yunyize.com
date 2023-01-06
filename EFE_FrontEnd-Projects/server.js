const server = require('node-http-server');

server.deploy({
    port: 14514,
    root: `dist/`
}, server => {
    console.log(`\n-- Server starts at http://127.0.0.1:${server.config.port}/ --\n`);
});
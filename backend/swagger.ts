const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Timesheet App',
    description: 'Description',
  },
  host: 'localhost:3196',
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/v1/route-index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);

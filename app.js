const Hapi = require('hapi');
const os = require('os');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.route({
  method: 'GET',
  path:'/',
  handler: function (request, reply) {
    return reply({
      os: os.hostname(),
      platform: os.platform(),
      uptime: os.uptime(),
      loadavg: os.loadavg(),
      mem: {
        free: os.freemem(),
        total: os.totalmem()
      }
    });
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
});
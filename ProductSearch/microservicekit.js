
const MicroserviceKit = require('microservice-kit');

module.exports = new MicroserviceKit({
  type: 'consumer',
  amqp: {
    url: 'amqp://rabbitmq:5672',
    queues: [
      {
        name: 'search',
        key: 'search',
        options: {durable: true}
      }
    ]
  }
});

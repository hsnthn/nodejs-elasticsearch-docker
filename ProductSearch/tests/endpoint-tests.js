var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../app');
var sinon = require('sinon');


describe('endpoint test', function() {

    it('it should bulk insert to elastic search', (done) => {
      chai.use(chaiHttp);
        chai.request(server)
            .get('/bulk')
            .end((err, res) => {
                res.should.have.status(200);
              done();
        });
    });
});


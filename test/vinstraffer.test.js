const should = require('should');
const assert = require('assert');
const request = require('supertest');

describe('Routing', () => {
  const url = 'http://localhost:7363';

  const requestAndExpectAll = (text, done) => {
    request(url)
    .post('/vinstraffer')
    .send({ text })
    // end handles the response
    .end((err, res) => {
      if (err) {
        throw err;
      }
      // this is should.js syntax, very clear
      res.should.have.property('status', 200);
      res.body.text.should.equal('Her er alle vinstraffene');
      done();
    });
  };

  describe('Vinstraffer', () => {
    it('should return all vinstraffer if text is empty string', (done) => {
      requestAndExpectAll('', done);
    });

    it('should return all vinstraffer if text is null', (done) => {
      requestAndExpectAll(null, done);
    });

    it('should return user\'s vinstraffer if text is username', (done) => {
      const text = 'mats';

      request(url)
        .post('/vinstraffer')
        .send({ text })
          // end handles the response
        .end((err, res) => {
          if (err) {
            throw err;
          }
            // this is should.js syntax, very clear
          res.should.have.property('status', 200);
          res.body.text.should.equal('Her er mats sine vinstraffer');
          done();
        });
    });
  });
});

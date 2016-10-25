const path = require('path');
const should = require('should');
const assert = require('assert');
const request = require('supertest');

describe('Routing', () => {
  const url = 'http://localhost:7363';

  const requestAndExpectAll = (endpoint, text, done) => {
    request(url)
    .post(`${endpoint[0] === '/' ? '' : '/'}${endpoint}`)
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

  describe('Vinstraffer readme', () => {
    it('should return all vinstraffer if text is empty string', (done) => {
      requestAndExpectAll('vinstraffer', '', done);
    });

    it('should return all vinstraffer if text is null', (done) => {
      requestAndExpectAll('vinstraffer', null, done);
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

  describe('Vinstraffer backup', () => {
    it('should return all vinstraffer if text is empty string', (done) => {
      requestAndExpectAll('vinstraffer-backup', '', done);
    });

    it('should return all vinstraffer if text is null', (done) => {
      requestAndExpectAll('vinstraffer-backup', null, done);
    });

    it('should return user\'s vinstraffer if text is username', (done) => {
      const text = 'larsen';

      request(url)
        .post('/vinstraffer-backup')
        .send({ text })
          // end handles the response
        .end((err, res) => {
          if (err) {
            throw err;
          }
            // this is should.js syntax, very clear
          res.should.have.property('status', 200);
          res.body.text.should.equal('Her er larsen sine vinstraffer');
          done();
        });
    });
  });
});

const path = require('path');
const should = require('should');
const assert = require('assert');
const request = require('supertest');

describe('Routing', () => {
  const url = 'http://localhost:7363';

  const requestAndExpect = (endpoint, reqText, expectedStatus, expectedText, done) => {
    request(url)
    .post(`${endpoint[0] === '/' ? '' : '/'}${endpoint}`)
    .send({ text: reqText })
    // end handles the response
    .end((err, res) => {
      if (err) {
        throw err;
      }
      // this is should.js syntax, very clear
      res.should.have.property('status', expectedStatus);
      res.body.text.should.equal(expectedText);
      done();
    });
  };

  describe('Vinstraffer readme', () => {
    it('should return all vinstraffer if text is empty string', (done) => {
      requestAndExpect('vinstraffer', '', 200, 'Her er alle vinstraffene', done);
    });

    it('should return all vinstraffer if text is null', (done) => {
      requestAndExpect('vinstraffer', null, 200, 'Her er alle vinstraffene', done);
    });

    it('should return user\'s vinstraffer if text is username', (done) => {
      requestAndExpect('vinstraffer', 'mats', 200, 'Her er mats sine vinstraffer', done);
    });

    it('should return no vinstraffer if user has no vinstraffer', (done) => {
      requestAndExpect('vinstraffer', 'goodboy', 200, 'goodboy har ingen vinstraffer', done);
    });
  });

  describe('Vinstraffer backup', () => {
    it('should return all vinstraffer if text is empty string', (done) => {
      requestAndExpect('vinstraffer-backup', '', 200, 'Her er alle vinstraffene', done);
    });

    it('should return all vinstraffer if text is null', (done) => {
      requestAndExpect('vinstraffer-backup', null, 200, 'Her er alle vinstraffene', done);
    });

    it('should return user\'s vinstraffer if text is username', (done) => {
      requestAndExpect('vinstraffer-backup', 'larsen', 200, 'Her er larsen sine vinstraffer', done);
    });

    it('should return no vinstraffer if user has no vinstraffer', (done) => {
      requestAndExpect('vinstraffer-backup', 'goodboy', 200, 'goodboy har ingen vinstraffer', done);
    });
  });
});

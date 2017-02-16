const chai = require('chai');

const makeRequest = require('./helpers/makeRequest');
const setupMessages = require('./helpers/setupMessages');
const handleAssertions = require('./helpers/handleAssertions');

const expect = chai.expect;
const messages = setupMessages();

describe('basic messages', function() {
  const testMessage = function(message) {
    describe(message, function() {
      beforeEach(function(done) {
        makeRequest(message).then(
          function(result) {
            this.response = result;
            done();
          }.bind(this),
          function(err) {
            throw err;
          }
        );
      });

      it('it should handle return a valid response', function() {
        expect(this.response).to.not.be.undefined;
        expect(this.response).to.have.ownPropertyDescriptor('result');
        expect(this.response.result).to.have.ownPropertyDescriptor('fulfillment');
        expect(this.response.result.fulfillment).to.have.ownPropertyDescriptor('speech');
        expect(this.response.result.fulfillment).to.have.ownPropertyDescriptor('displayText');

        handleAssertions(this.response.result.fulfillment.speech);
      });
    });
  };

  messages.forEach(function(message) {
    testMessage(message);
  });
});

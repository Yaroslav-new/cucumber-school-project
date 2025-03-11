const assert = require('assert');
const { Person, Network } = require('../src/shouty/shouty');

describe('Network', () => {
    let network, message;

    beforeEach(() => {
        const range = 100;
        network = new Network(range);
        message = "Free bagels!";
    });

    it('broadcasts a message to a listener within range', function () {
        const shouterLocation = 0;
        const listenerLocation = 90;
        const lucy = new Person(network, listenerLocation);

        assert.strictEqual(lucy.messagesHeard().length, 0);
        network.broadcast(message, shouterLocation);
        assert.strictEqual(lucy.messagesHeard()[0], message);
    });

    it('does not broadcast a message over 180 characters even if listener is in range', function () {
        const shouterLocation = 0;
        const listenerLocation = 90;
        const lucy = new Person(network, listenerLocation);

        const longMessage = 'x'.repeat(181);

        network.broadcast(longMessage, shouterLocation);

        assert.strictEqual(lucy.messagesHeard().length, 0);
    });

    it('does not deliver a message if listener is out of range', function () {
        const shouterLocation = 0;
        const listenerLocation = 150;
        const larry = new Person(network, listenerLocation);

        network.broadcast(message, shouterLocation);

        assert.strictEqual(larry.messagesHeard().length, 0);
    });
});

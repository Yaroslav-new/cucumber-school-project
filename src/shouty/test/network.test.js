const assert = require('assert');
const { Person, Network, MAX_MESSAGE_LENGTH } = require('../shouty');

describe('Network', () => {
    let network, sean, message;

    beforeEach(() => {
        const range = 100;
        network = new Network(range);
        sean = new Person(network, 0);
        message = "Free bagels!";
    });

    it('broadcasts a message to a listener within range', function () {
        const lucy = new Person(network, 90);

        assert.strictEqual(lucy.messagesHeard().length, 0);
        network.broadcast(message, sean);
        assert.deepStrictEqual(lucy.messagesHeard(), [message]);
    });

    it('delivers a message to a listener exactly at the edge of the range', function () {
        const lucy = new Person(network, 100);

        network.broadcast(message, sean);

        assert.deepStrictEqual(lucy.messagesHeard(), [message]);
    });

    it('does not deliver a message if listener is out of range', function () {
        const larry = new Person(network, 150);

        network.broadcast(message, sean);

        assert.strictEqual(larry.messagesHeard().length, 0);
    });

    it('does not deliver a message back to the shouter', function () {
        network.broadcast(message, sean);

        assert.strictEqual(sean.messagesHeard().length, 0);
    });

    it(`delivers a message of exactly ${MAX_MESSAGE_LENGTH} characters`, function () {
        const lucy = new Person(network, 90);
        const longestMessage = 'x'.repeat(MAX_MESSAGE_LENGTH);

        assert.strictEqual(network.broadcast(longestMessage, sean), true);
        assert.deepStrictEqual(lucy.messagesHeard(), [longestMessage]);
    });

    it(`does not broadcast a message over ${MAX_MESSAGE_LENGTH} characters even if listener is in range`, function () {
        const lucy = new Person(network, 90);
        const longMessage = 'x'.repeat(MAX_MESSAGE_LENGTH + 1);

        assert.strictEqual(network.broadcast(longMessage, sean), false);
        assert.strictEqual(lucy.messagesHeard().length, 0);
    });
});

describe('Person', () => {
    let network;

    beforeEach(() => {
        network = new Network(100);
    });

    it('requires a network', function () {
        assert.throws(() => new Person(null, 0), /requires a network/);
    });

    it('rejects a message that is not a string', function () {
        const sean = new Person(network, 0);

        assert.throws(() => sean.shout(123), TypeError);
    });

    it('remembers only messages that were actually sent', function () {
        const sean = new Person(network, 0);

        sean.shout('Free bagels!');
        sean.shout('x'.repeat(MAX_MESSAGE_LENGTH + 1));

        assert.deepStrictEqual(sean.messagesShouted(), ['Free bagels!']);
    });

    it('does not let callers change heard messages from outside', function () {
        const sean = new Person(network, 0);
        const lucy = new Person(network, 10);
        sean.shout('Free bagels!');

        lucy.messagesHeard().push('hacked');

        assert.deepStrictEqual(lucy.messagesHeard(), ['Free bagels!']);
    });
});

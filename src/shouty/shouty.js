const MAX_MESSAGE_LENGTH = 180;

class Person {
  constructor(network, location) {
    if (!network) {
      throw new Error('Person requires a network');
    }
    this.messages = [];
    this.shouts = [];
    this.network = network;
    this.location = location;
    this.network.subscribe(this);
  }

  shout(message) {
    if (typeof message !== 'string') {
      throw new TypeError(`Message must be a string, got ${typeof message}`);
    }
    if (this.network.broadcast(message, this)) {
      this.shouts.push(message);
    }
  }

  hear(message) {
    this.messages.push(message);
  }

  // Copies, so callers cannot change the person's state from outside.
  messagesHeard() {
    return [...this.messages];
  }

  messagesShouted() {
    return [...this.shouts];
  }
}

class Network {
  constructor(range) {
    this.listeners = [];
    this.range = range;
  }

  subscribe(person) {
    this.listeners.push(person);
  }

  // Returns true if the message was sent, false if it was rejected (too long).
  broadcast(message, shouter) {
    if (message.length > MAX_MESSAGE_LENGTH) {
      return false;
    }

    this.listeners.forEach((listener) => {
      if (listener === shouter) {
        return;
      }
      const withinRange = Math.abs(listener.location - shouter.location) <= this.range;
      if (withinRange) {
        listener.hear(message);
      }
    });
    return true;
  }
}

module.exports = { Person, Network, MAX_MESSAGE_LENGTH };

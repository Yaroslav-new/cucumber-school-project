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

  get location() {
    return this._location;
  }

  set location(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError(`Location must be a finite number, got ${value}`);
    }
    this._location = value;
  }

  // Returns true if the message was sent, false if the network rejected it (too long).
  shout(message) {
    const sent = this.network.broadcast(message, this);
    if (sent) {
      this.shouts.push(message);
    }
    return sent;
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
    // A Set, so subscribing the same person twice does not duplicate their messages.
    this.listeners = new Set();
    this.range = range;
  }

  get range() {
    return this._range;
  }

  set range(value) {
    if (!Number.isFinite(value) || value < 0) {
      throw new TypeError(`Range must be a non-negative finite number, got ${value}`);
    }
    this._range = value;
  }

  subscribe(person) {
    this.listeners.add(person);
  }

  unsubscribe(person) {
    this.listeners.delete(person);
  }

  // Returns true if the message was sent, false if it was rejected (too long).
  broadcast(message, shouter) {
    if (typeof message !== 'string') {
      throw new TypeError(`Message must be a string, got ${typeof message}`);
    }
    // Spread counts characters (code points), so an emoji is one character, not two.
    if ([...message].length > MAX_MESSAGE_LENGTH) {
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

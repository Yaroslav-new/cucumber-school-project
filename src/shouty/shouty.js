class Person {
    constructor(network) {
        this.messages = [];
        this.network = network;
        this.network.subscribe(this);
    }

    shout(message) {
        this.network.broadcast(message);
    }

    hear(message) {
        this.messages.push(message);
    }

    messagesHeard() {
        return this.messages;
    }
}

class Network {
    constructor() {
        this.subscribers = [];
    }

    subscribe(person) {
        this.subscribers.push(person);
    }

    broadcast(message) {
        this.subscribers.forEach(subscriber => subscriber.hear(message));
    }
}

module.exports = { Person, Network };

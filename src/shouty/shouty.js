class Person {
    constructor(network, location) {
        this.messages = [];
        this.network = network;
        this.location = location;

        if (this.network) {
            this.network.subscribe(this);
        }
    }

    shout(message) {
        this.network.broadcast(message, this.location);
    }

    hear(message) {
        this.messages.push(message);
    }

    messagesHeard() {
        return this.messages;
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

    broadcast(message, shouterLocation) {
        this.listeners.forEach(listener => {
            const withinRange = Math.abs(listener.location - shouterLocation) <= this.range;
            if (withinRange && message.length <= 180) {
                listener.hear(message);
            }
        });
    }
}

module.exports = { Person, Network };
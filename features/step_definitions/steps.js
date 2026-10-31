const { Before, Given, When, Then } = require('@cucumber/cucumber');
const { Person, Network } = require('../../src/shouty/shouty');
const { assertThat, is } = require('hamjest');

const DEFAULT_RANGE = 100;

Before(function () {
  this.people = {};
  this.network = new Network(DEFAULT_RANGE);
});

// Changes the range of the existing network, so people created earlier stay connected.
Given('the range is {int}', function (range) {
  this.network.range = range;
});

Given('a person named {word}', function (name) {
  if (!this.people[name]) {
    this.people[name] = new Person(this.network, 0);
  }
});

Given('people are located at', function (dataTable) {
  dataTable.hashes().forEach((row) => {
    const location = Number(row.location);
    if (!Number.isInteger(location)) {
      throw new Error(`Location of ${row.name} must be an integer, got "${row.location}"`);
    }

    if (!this.people[row.name]) {
      this.people[row.name] = new Person(this.network, location);
    } else {
      this.people[row.name].location = location;
    }
  });
});

When('{person} shouts {string}', function (person, message) {
  person.shout(message);
});

When('{person} shouts', function (person) {
  person.shout('Hello, world');
});

When('{person} shouts the following message', function (person, docString) {
  person.shout(docString);
});

When('{person} shouts a message of {int} characters', function (person, length) {
  person.shout('x'.repeat(length));
});

Then('{person} should hear a shout', function (person) {
  assertThat(person.messagesHeard().length, is(1));
});

Then("{person} should hear {person}'s message", function (listener, shouter) {
  assertThat(listener.messagesHeard(), is(shouter.messagesShouted()));
});

Then('{person} should not hear a shout', function (person) {
  assertThat(person.messagesHeard(), is([]));
});

Then('{person} hears the following messages:', function (person, expectedMessages) {
  const actualMessages = person.messagesHeard();
  assertThat(actualMessages, is(expectedMessages.raw().map((row) => row[0])));
});

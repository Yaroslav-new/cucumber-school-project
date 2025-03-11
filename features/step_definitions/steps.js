const { Before, Given, When, Then } = require("@cucumber/cucumber");
const { Person, Network } = require("../../src/shouty/shouty");
const { assertThat, is, not } = require("hamjest");

const default_range = 100;

Before(function () {
  this.people = {};
  this.network = new Network(default_range);
});

Given('the range is {int}', function (range) {
  this.network = new Network(range);
});

Given('a person named {word}', function (name) {
  if (!this.people[name]) {
    this.people[name] = new Person(this.network, 0);
  }
});

Given('people are located at', function (dataTable) {
  dataTable.hashes().forEach(row => {
    if (!this.people[row.name]) {
      this.people[row.name] = new Person(this.network, parseInt(row.location, 10));
    } else {
      this.people[row.name].location = parseInt(row.location, 10);
    }
  });
});

When('{person} shouts {string}', function (person, message) {
  if (!this.people[person]) {
    throw new Error(`${person} is not defined in this.people`);
  }
  this.people[person].shout(message);
});

When('{person} shouts', function (person) {
  if (!this.people[person]) {
    throw new Error(`${person} is not defined in this.people`);
  }
  this.people[person].shout('Hello, world');
});

When('{person} shouts the following message', function (person, docString) {
  if (!this.people[person]) {
    throw new Error(`${person} is not defined in this.people`);
  }
  this.people[person].shout(docString);
});

Then('{person} should hear a shout', function (person) {
  assertThat(this.people[person].messagesHeard().length, is(1));
});

Then('{person} should hear {person2}\s message', function (listener, shouter) {
  if (!this.people[listener]) {
    throw new Error(`${listener} is not defined in this.people`);
  }
  if (!this.people[shouter]) {
    throw new Error(`${shouter} is not defined in this.people`);
  }
  assertThat(this.people[listener].messagesHeard(), is([this.people[shouter].messagesHeard()[0]]));
});

Then('{person} should not hear a shout', function (person) {
  assertThat(this.people[person].messagesHeard(), is([]));
});

Then('{person} hears the following messages:', function (person, expectedMessages) {
  let actualMessages = this.people[person].messagesHeard();
  assertThat(actualMessages, is(expectedMessages.raw().map(row => row[0])));
});
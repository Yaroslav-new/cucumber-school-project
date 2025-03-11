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
  dataTable.hashes().forEach(row => {
    if (!this.people[row.name]) {
      this.people[row.name] = new Person(this.network, parseInt(row.location, 10));
    } else {
      this.people[row.name].location = parseInt(row.location, 10);
    }
  });
});

When('{person} shouts {string}', function (person, message) {
  this.people[person].shout(message);
});

When('{person} shouts', function (person) {
  this.people[person].shout('Hello, world');
});

When('{person} shouts the following message', function (person, docString) {
  this.people[person].shout(docString);
});

Then('{person} should hear a shout', function (person) {
  assertThat(this.people[person].messagesHeard().length, is(1));
});

Then('{person} should hear {person2}\'s message', function (listener, shouter) {
  assertThat(this.people[listener].messagesHeard(), is(this.people[shouter].messagesHeard()));
});

Then('{person} should not hear a shout', function (person) {
  assertThat(this.people[person].messagesHeard(), is([]));
});

Then('{person} hears the following messages:', function (person, expectedMessages) {
  let actualMessages = this.people[person].messagesHeard();
  assertThat(actualMessages, is(expectedMessages.raw().map(row => row[0])));
});
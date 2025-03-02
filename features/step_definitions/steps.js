const { Before, Given, When, Then } = require("@cucumber/cucumber");
const {Person, Network} = require("../../src/shouty/shouty");
const { assertThat, is } = require("hamjest");

Before(function () {
    this.network = new Network()
    this.people = {}
  })

Given('a person named {word}', function (name) {
  this.people[name] = new Person(this.network)
})

When('Sean shouts {string}', function (message) {
    this.people['Sean'].shout(message);
    this.messageFromSean = message;
});

Then('{person} hears Sean\'s message', function (Lucy) {
    assertThat(this.people['Lucy'].messageHeard(), is([this.messageFromSean]));
});
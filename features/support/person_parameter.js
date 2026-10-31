const { defineParameterType } = require('@cucumber/cucumber');

// Matches any capitalised name and turns it into the Person created earlier in the scenario.
// A regular function (not an arrow) is required so that `this` is the Cucumber World.
defineParameterType({
  name: 'person',
  regexp: /[A-Z][a-z]+/,
  transformer: function (name) {
    const person = this.people[name];
    if (!person) {
      throw new Error(`Unknown person "${name}". Create them first with "a person named ${name}".`);
    }
    return person;
  },
});

const { defineParameterType } = require('@cucumber/cucumber');

// The only name format the {person} parameter can match, so the steps that create people
// must reject anything else: otherwise the person could never be referred to later.
const PERSON_NAME = /[A-Z][a-z]+/;

function assertValidPersonName(name) {
  if (!new RegExp(`^${PERSON_NAME.source}$`).test(name)) {
    throw new Error(
      `Invalid person name "${name}": use one capitalised word of letters, like "Sean".`,
    );
  }
}

// Matches any capitalised name and turns it into the Person created earlier in the scenario.
// A regular function (not an arrow) is required so that `this` is the Cucumber World.
defineParameterType({
  name: 'person',
  regexp: PERSON_NAME,
  transformer: function (name) {
    const person = this.people[name];
    if (!person) {
      throw new Error(`Unknown person "${name}". Create them first with "a person named ${name}".`);
    }
    return person;
  },
});

module.exports = { assertValidPersonName };

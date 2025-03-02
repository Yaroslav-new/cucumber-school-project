const { defineParameterType } = require("@cucumber/cucumber");
const Person = require("../../src/shouty/shouty");
const { regExp } = require("hamjest");

defineParameterType({
    name: 'person',
    regexp: /Lucy|Sean/,
    transformer: name => new Person(name)
});

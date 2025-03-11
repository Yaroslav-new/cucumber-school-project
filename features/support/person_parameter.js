const { defineParameterType } = require("@cucumber/cucumber");
const { Person, Network } = require("../../src/shouty/shouty");

const sharedNetwork = new Network(100);

defineParameterType({
    name: 'person',
    regexp: /Lucy|Sean|Larry/,
    transformer: name => name
});

defineParameterType({
    name: 'person2',
    regexp: /Lucy|Sean|Larry/,
    transformer: name => name
});
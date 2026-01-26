const { defineParameterType } = require("@cucumber/cucumber");
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

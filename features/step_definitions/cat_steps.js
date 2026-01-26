const { Given, When, Then } = require("@cucumber/cucumber");
const { assertThat, is } = require("hamjest");

Given("CAT HAZ FOOD", function () {
  this.catHasFood = true;
});

When("CAT EATZ", function () {
  this.catIsHappy = Boolean(this.catHasFood);
});

Then("CAT IZ HAPPY", function () {
  assertThat(this.catIsHappy, is(true));
});

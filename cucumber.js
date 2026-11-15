// Cucumber profiles. Run with: npx cucumber-js [-p <profile>]
const common = {
  paths: ['features/**/*.feature'],
  require: ['features/step_definitions/**/*.js', 'features/support/**/*.js'],
};

module.exports = {
  default: { ...common, format: ['pretty'] },
  json: { ...common, format: ['json:report.json'] },
  html: { ...common, format: ['html:report.html'] },
  // Used in GitHub Actions: readable log + JUnit XML for the summary + HTML report as an artifact.
  ci: {
    ...common,
    format: ['pretty', 'junit:reports/cucumber-junit.xml', 'html:reports/cucumber-report.html'],
  },
};
